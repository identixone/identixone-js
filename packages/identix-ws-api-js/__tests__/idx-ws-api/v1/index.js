import { WebSocket, Server } from "mock-socket";
import { IDXWsApiV1 } from "../../../src/idx-ws-api/v1";

import { apiEndpoints } from "../../__mocks__/constants";

describe("IDXWsApiV1 test", () => {
  const mockedServer = new Server(apiEndpoints.v1);
  const mockedToken = "mocked token";
  const idxWsApi = new IDXWsApiV1({
    apiEndpoints,
    SocketClient: WebSocket,
    token: mockedToken,
  });

  const mockedEmit = jest.fn();

  idxWsApi.emit = mockedEmit;

  afterEach(() => {
    mockedEmit.mockClear();
  });

  describe("connect method test", () => {
    let pingPongMessages = [];

    afterEach(() => {
      idxWsApi.disconnect();
      pingPongMessages = [];
    });

    mockedServer.on("connection", socket => {
      socket.on("message", data => {
        // add messages to mocked queue
        pingPongMessages.push(data);
      });
    });

    test("should send auth message on connect", done => {
      const authMessage = JSON.stringify({
        action: "AUTH",
        data: {
          token: mockedToken,
        },
      });

      idxWsApi.connect();

      /** NOTE: this timeout is for creating another micro task that will
       * happen after the send in connect
       */
      setTimeout(() => {
        expect(pingPongMessages[0]).toBe(authMessage);
        done();
      }, 100);
    });

    test("should not emit message event with message on socket message event", done => {
      const mockedMessage = {
        auth: "ok",
      };

      idxWsApi.connect();

      mockedServer.on("connection", socket => {
        socket.send(JSON.stringify(mockedMessage));

        /** NOTE: this timeout is for creating another micro task that will
         * happen after the send in connect
         */
        setTimeout(() => {
          expect(mockedEmit).not.toHaveBeenCalledWith("message", mockedMessage);
          expect(mockedEmit).toHaveBeenCalledWith("connect");

          done();
        }, 100);
      });
    });

    test("should emit message event with message on socket message event", done => {
      const mockedMessage = {
        user: "Jane Doe",
        message: "Im here",
      };

      idxWsApi.connect();

      mockedServer.on("connection", socket => {
        socket.send(JSON.stringify(mockedMessage));

        /** NOTE: this timeout is for creating another micro task that will
         * happen after the send in connect
         */
        setTimeout(() => {
          expect(mockedEmit).toHaveBeenCalledWith("message", mockedMessage);
          done();
        }, 100);
      });
    });

    test("should emit disconnect event with message on socket close event", done => {
      const mockedMessage = {
        code: 1000,
        reason: "",
        wasClean: true,
      };

      idxWsApi.connect();

      mockedServer.on("connection", socket => {
        socket.close(JSON.stringify(mockedMessage));

        /** NOTE: this timeout is for creating another micro task that will
         * happen after the send in connect
         */
        setTimeout(() => {
          expect(mockedEmit).toHaveBeenCalledWith("disconnect", mockedMessage);
          done();
        }, 100);
      });
    });

    test("should not emit connect event on socket connection", done => {
      idxWsApi.connect();

      mockedServer.on("connection", () => {
        /** NOTE: this timeout is for creating another micro task that will
         * happen after the send in connect
         */
        setTimeout(() => {
          expect(mockedEmit).toHaveBeenCalledWith("connect");

          done();
        }, 100);
      });
    });

    test("should emit a error event on invalid JSON message from server", done => {
      idxWsApi.connect();

      mockedServer.on("connection", socket => {
        /** NOTE: this timeout is for creating another micro task that will
         * happen after the send in connect
         */
        socket.send("string");

        setTimeout(() => {
          try {
            JSON.parse("string");
          } catch (error) {
            expect(mockedEmit).toHaveBeenCalledWith("error", error);
            done();
          }
        }, 100);
      });
    });
  });

  describe("disconnect method test", () => {
    test("should call socket disconnect method", done => {
      idxWsApi.connect();

      mockedServer.on("connection", socket => {
        idxWsApi.disconnect();

        setTimeout(() => {
          expect(socket.readyState).toBe(socket.CLOSED);
          done();
        }, 100);
      });
    });
  });

  describe("setToken method test", () => {
    afterAll(() => {
      idxWsApi.disconnect.restoreMock();
    });

    test("should call disconnect method and update token", () => {
      idxWsApi.disconnect = jest.fn();

      idxWsApi.setToken("new token");

      expect(idxWsApi.disconnect).toHaveBeenCalledTimes(1);
      expect(idxWsApi.token).toBe("new token");
    });
  });
});
