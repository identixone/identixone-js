const { EventEmitter } = require("../../base/event-emitter");

class IDXWsApiV1 extends EventEmitter {
  constructor({ token, SocketClient, apiEndpoints, endpoint }) {
    super();

    Object.assign(this, { token, SocketClient });

    this._endpoint = endpoint || apiEndpoints.v1;
    this._isSocketOpen = false;
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
          if (parsedData.auth === "ok") return;

          this.emit("message", parsedData);
        } catch (error) {
          this.emit("error", error);
        }
      };

      this.socket.onclose = data => {
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
}

module.exports = {
  IDXWsApiV1,
};
