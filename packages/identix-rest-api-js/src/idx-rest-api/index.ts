import "isomorphic-form-data";

import axios from "axios";
import { createHttpClient } from "../http-client";

import { ApiFacadeV1, ApiFacadeV1Interface } from "./api-facade/v1";
import { Auth as AuthV1 } from "./features/auth/v1";
import { Entries as EntriesV1 } from "./features/entries/v1";
import { Notifications as NotificationsV1 } from "./features/notifications/v1";
import { Persons as PersonsV1 } from "./features/persons/v1";
import { Sources as SourcesV1 } from "./features/sources/v1";
import { Users as UsersV1 } from "./features/users/v1";
import { Utilities as UtilitiesV1 } from "./features/utilities/v1";

import { apiEndpoints, apiVersions } from "../constants";
import { numeric } from "../base/types";

interface IDXRestApiSettingsInterface {
  token?: string;
  version?: numeric;
}

function createIDXRestApiV1({
  token,
}: {
  token?: string;
} = {}): ApiFacadeV1Interface {
  const HttpClient = createHttpClient({ client: axios });
  const httpClient = new HttpClient({
    baseURL: apiEndpoints.v1,
    token,
  });

  return new ApiFacadeV1({
    httpClient,
    auth: new AuthV1({ httpClient }),
    notifications: new NotificationsV1({ httpClient }),
    entries: new EntriesV1({ httpClient }),
    persons: new PersonsV1({ httpClient }),
    sources: new SourcesV1({ httpClient }),
    users: new UsersV1({ httpClient }),
    utilities: new UtilitiesV1({ httpClient }),
  });
}

function createIDXRestApi(
  settings: IDXRestApiSettingsInterface = {}
): ApiFacadeV1Interface | undefined {
  const { version, token } = settings;

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
      return createIDXRestApiV1({ token });
  }
}

export { createIDXRestApi };
