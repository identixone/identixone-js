const { EventEmitter } = require("../../base/event-emitter");

class IDXWsApiV1 extends EventEmitter {
  constructor({ token, SocketClient, apiEndpoints }) {
    super();

    Object.assign(this, { token, SocketClient, apiEndpoints });
  }

  setToken(token) {
    this.disconnect();
    this.token = token;
  }

  connect() {
    this.socket = new this.SocketClient(this.apiEndpoints.v1);

    this.socket.onopen = () => {
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
