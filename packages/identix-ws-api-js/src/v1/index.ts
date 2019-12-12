import EventEmitter from "events";
import debounce from "lodash.debounce";

interface EventEmitterInterface {
  on: (event: string | symbol, listener: (...args: any[]) => void) => any;
  emit: (event: string | symbol, ...args: any[]) => any;
}

interface SocketClientInterface {
  send(msg: string): void;
  onopen(event: any): void;
  onmessage(event: any): void;
  close(): void;
  onclose(data?: any): void;
  terminate(): void;
}

interface IDXWsApiV1SettingsInterface {
  token?: string;
  version?: number | string;
  endpoint?: string;
  apiEndpoints: { v1: string };
  SocketClient: new (endpoint: string) => SocketClientInterface;
}

interface IDXWsApiV1Interface extends EventEmitterInterface {
  setToken(token: string): void;
  setEndpoint(endpoint: string): void;
  connect(): void;
  disconnect(): void;
  terminate(): void;
}

class IDXWsApiV1 extends EventEmitter implements IDXWsApiV1Interface {
  private SocketClient: new (endpoint: string) => SocketClientInterface;
  socket: SocketClientInterface;
  private isSocketOpen = false;

  private token: string;
  private endpoint: string;

  private reconnectTimeout: ReturnType<typeof setTimeout> = null;
  private pingTimeout: ReturnType<typeof setTimeout> = null;
  private pingBackOffDelay = 1000;
  private reconnectTime = 30000;

  constructor({
    token,
    SocketClient,
    apiEndpoints,
    endpoint,
  }: IDXWsApiV1SettingsInterface) {
    super();

    this.token = token;
    this.endpoint = endpoint || apiEndpoints.v1;
    this.SocketClient = SocketClient;
  }

  private heartbeat(): void {
    clearTimeout(this.reconnectTimeout);
    clearTimeout(this.pingTimeout);

    this.socket.send(JSON.stringify({ action: "PING" }));

    /**
     * Если ответа нет в течение this.pingBackOffDelay
     * шлём еще один запрос и так до достижения this.reconnectTime
     */
    this.pingTimeout = setTimeout(() => {
      this.heartbeat();
      this.pingBackOffDelay = this.pingBackOffDelay * 2;
    }, this.pingBackOffDelay);

    this.reconnectTimeout = setTimeout(() => {
      this.disconnect();
      this.connect();
    }, this.reconnectTime);
  }

  private debouncedHeartbeat(): () => void {
    return debounce(this.heartbeat, 5000);
  }

  private resetPing(): void {
    clearTimeout(this.reconnectTimeout);
    clearTimeout(this.pingTimeout);

    this.pingBackOffDelay = 1000;
  }

  setToken(token: string): void {
    this.token = token;

    if (this.isSocketOpen) {
      this.disconnect();
    }
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;

    if (this.isSocketOpen) {
      this.disconnect();
    }
  }

  connect(): void {
    this.socket = new this.SocketClient(this.endpoint);

    this.socket.onopen = (): void => {
      this.isSocketOpen = true;

      this.resetPing();

      this.socket.send(
        JSON.stringify({
          action: "AUTH",
          data: {
            token: this.token,
          },
        })
      );

      this.socket.onmessage = ({ data } = { data: "" }): void => {
        try {
          const parsedData = JSON.parse(data);

          if (parsedData.auth === "ok") {
            this.debouncedHeartbeat();
            return;
          }

          if (parsedData.PING) {
            this.resetPing();
            this.debouncedHeartbeat();
            return;
          }

          this.emit("message", parsedData);
        } catch (error) {
          this.emit("error", error);
        }
      };

      this.socket.onclose = (data): void => {
        console.log({ data });
        this.resetPing();

        this.emit("disconnect", data);

        this.isSocketOpen = false;
      };

      this.emit("connect");
    };
  }

  disconnect(): void {
    this.socket.close();
  }

  terminate(): void {
    this.socket.terminate();
  }
}

export { IDXWsApiV1Interface, IDXWsApiV1 };
