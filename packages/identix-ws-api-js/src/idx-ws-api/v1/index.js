const { EventEmitter } = require("../../base/event-emitter");
const { apiEndpoints } = require("../../constants");

class IDXWsApiV1 extends EventEmitter {
  constructor({ token, SocketClient }) {
    super();

    Object.assign(this, { token, SocketClient });
  }

  setToken(token) {
    this.disconnect();
    this.token = token;
  }

  connect() {
    this.socket = new this.SocketClient(apiEndpoints.v1);

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
        const parsedData = JSON.parse(data);
        if (parsedData.auth === "ok") return;

        this.emit("message", parsedData);
      };

      this.socket.onclose = data => {
        const { wasClean, reason, code } = data;

        this.emit("close", { wasClean, reason, code });
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
