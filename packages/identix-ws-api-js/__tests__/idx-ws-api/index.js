import WebSocket from "isomorphic-ws";

import { createIDXWsApi } from "../../src";
import { IDXWsApiV1 } from "../../src/v1";
import { apiVersions } from "../../src/constants";

describe("createIDXWsApi test", () => {
  const mockedToken = "token";
  const existedVersions = [1];
  const nonExistedVersion = 999;

  test("should throw a non setted version error", () => {
    const call = () => {
      createIDXWsApi({ token: mockedToken });
    };

    expect(call).toThrow(
      new Error(`You did not specify Identix API version.
      Available versions: ${apiVersions.join(", ")}`)
    );
  });

  test("should throw a non existed version error", () => {
    const call = () => {
      createIDXWsApi({ token: mockedToken, version: nonExistedVersion });
    };

    expect(call).toThrow(
      new Error(
        `You have specified a non-existent version of Identix API: ${nonExistedVersion}.
      Available versions: ${apiVersions.join(", ")}`
      )
    );
  });

  test("should create an IDXWsApiV1 with correct parameters", () => {
    const IDXWsApi = createIDXWsApi({
      token: mockedToken,
      version: existedVersions[0],
    });

    expect(IDXWsApi).toBeInstanceOf(IDXWsApiV1);

    expect(IDXWsApi.token).toBe(mockedToken);
    expect(IDXWsApi.SocketClient).toBe(WebSocket);
  });
});
