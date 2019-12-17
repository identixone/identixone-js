import "isomorphic-form-data";

import AuthV1 from "./features/auth/v1";
import UsersV1 from "./features/users/v1";
import EntriesV1 from "./features/entries/v1";
import NotificationsV1 from "./features/notifications/v1";
import PersonsGroupsV1 from "./features/persons-groups/v1";
import PersonsListsV1 from "./features/persons-lists/v1";
import SourcesV1 from "./features/sources/v1";
import UtilitiesV1 from "./features/utilities/v1";
import PersonsV1 from "./features/persons/v1";

import axios from "axios";
import createHttpClient from "../http-client.js";
import { IDXRestApi } from "./idx-rest-api";

import { apiEndpoints, apiVersions } from "../constants";

export const createIDXRestApi = ({ token, version } = {}) => {
  if (!version) {
    throw new Error(
      `You did not specify Identix API version.
      Available versions: ${apiVersions.join(", ")}`
    );
  }

  const numVersion = +version;

  if (!apiVersions.includes(numVersion)) {
    throw new Error(
      `You have specified a non-existent version of Identix API: ${version}.
      Available versions: ${apiVersions.join(", ")}`
    );
  }

  switch (numVersion) {
    case 1:
      return new IDXRestApi({
        token,
        endpoint: apiEndpoints.v1,
        Users: UsersV1,
        Auth: AuthV1,
        Entries: EntriesV1,
        Notifications: NotificationsV1,
        PersonsGroups: PersonsGroupsV1,
        PersonsLists: PersonsListsV1,
        Sources: SourcesV1,
        Utilities: UtilitiesV1,
        Persons: PersonsV1,
        HttpClient: createHttpClient({ client: axios }),
      });
  }
};
