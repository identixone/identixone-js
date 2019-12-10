const { EventEmitter } = require("../../base/event-emitter");
const { debounce } = require("lodash");

class IDXWsApiV1 extends EventEmitter {
  constructor({ token, SocketClient, apiEndpoints, endpoint }) {
    super();

    Object.assign(this, { token, SocketClient });

    this._endpoint = endpoint || apiEndpoints.v1;
    this._isSocketOpen = false;

    this._reconnectTimeout = null;
    this._pingTimeout = null;
    this._pingBackOffDelay = 1000;
    this._reconnectTime = 30000;

    this._debouncedHeartbeat = debounce(this._heartbeat, 5000);
  }

  _heartbeat() {
    clearTimeout(this._reconnectTimeout);
    clearTimeout(this._pingTimeout);

    this.socket.send(JSON.stringify({ action: "PING" }));

    /**
     * Если ответа нет в течение this._pingBackOffDelay
     * шлём еще один запрос и так до достижения this._reconnectTime
     */
    this._pingTimeout = setTimeout(() => {
      this._heartbeat();
      this._pingBackOffDelay = this._pingBackOffDelay * 2;
    }, this._pingBackOffDelay);

    this._reconnectTimeout = setTimeout(() => {
      this.disconnect();
      this.connect();
    }, this._reconnectTime);
  }

  _resetPing() {
    clearTimeout(this._reconnectTimeout);
    clearTimeout(this._pingTimeout);
    this._pingBackOffDelay = 1000;
  }

  setToken(token) {
    this.token = token;

    if (this._isSocketOpen) {
      this.disconnect();
    }
  }

  setEndpoint(endpoint) {
    this._endpoint = endpoint;

    if (this._isSocketOpen) {
      this.disconnect();
    }
  }

  connect() {
    this.socket = new this.SocketClient(this._endpoint);

    this.socket.onopen = () => {
      this._isSocketOpen = true;

      this._resetPing();
      this._debouncedHeartbeat();

      this.socket.send(
        JSON.stringify({
          action: "AUTH",
          data: {
            token: this.token,
          },
        })
      );

      this.socket.onmessage = ({ data }) => {
        try {
          const parsedData = JSON.parse(data);

          if (parsedData.auth === "ok") {
            return;
          }

          if (parsedData.PING) {
            this._resetPing();
            this._debouncedHeartbeat();
            return;
          }

          this.emit("message", parsedData);
        } catch (error) {
          this.emit("error", error);
        }
      };

      this.socket.onclose = data => {
        this._resetPing();

        const { wasClean, reason, code } = data;

        this.emit("disconnect", { wasClean, reason, code });

        this._isSocketOpen = false;
      };

      this.emit("connect");
    };
  }

  disconnect() {
    this.socket.close();
  }

  terminate() {
    this.socket.terminate();
  }
}

module.exports = {
  IDXWsApiV1,
};
