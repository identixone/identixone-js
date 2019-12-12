import { IDXWsApiV1, IDXWsApiV1Interface } from "./v1";
import { apiVersions, apiEndpoints } from "./constants";
import WebSocket from "isomorphic-ws";

interface IDXWsApiSettingsInterface {
  token?: string;
  version?: number | string;
  endpoint?: string;
}

function createIDXWsApi(
  settings: IDXWsApiSettingsInterface = {}
): IDXWsApiV1Interface {
  const { token, version, endpoint } = settings;

  if (!version) {
    throw new Error(
      `You did not specify Identix API version.
      Available versions: ${apiVersions.join(", ")}`
    );
  }

  const numVersion = Number(version);

  if (!apiVersions.includes(numVersion)) {
    throw new Error(
      `You have specified a non-existent version of Identix API: ${version}.
      Available versions: ${apiVersions.join(", ")}`
    );
  }

  switch (numVersion) {
    case 1:
      return new IDXWsApiV1({
        SocketClient: WebSocket,
        token,
        endpoint,
        apiEndpoints,
      });
  }
}

export { createIDXWsApi };
