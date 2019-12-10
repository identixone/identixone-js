const { IDXWsApiV1 } = require("./v1");
const { apiVersions, apiEndpoints } = require("../constants");

const WebSocket = require("isomorphic-ws");

const createIDXWsApi = ({ token, version, endpoint } = {}) => {
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
};

module.exports = {
  createIDXWsApi,
};
