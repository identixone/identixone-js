import { createIDXRestApi } from "../src/idx-rest-api";
import { apiVersions } from "../src/constants";

import { ApiFacadeV1 } from "../src/idx-rest-api/api-facade/v1";

import { Auth as AuthV1 } from "../src/idx-rest-api/features/auth/v1";
import { Users as UsersV1 } from "../src/idx-rest-api/features/users/v1";
import { Entries as EntriesV1 } from "../src/idx-rest-api/features/entries/v1";
import { Notifications as NotificationsV1 } from "../src/idx-rest-api/features/notifications/v1";
import { Sources as SourcesV1 } from "../src/idx-rest-api/features/sources/v1";
import { Utilities as UtilitiesV1 } from "../src/idx-rest-api/features/utilities/v1";
import { Persons as PersonsV1 } from "../src/idx-rest-api/features/persons/v1";

describe("createIDXRestApi test", () => {
  const mockedToken = "token";
  const existedVersions = [1];
  const nonExistedVersion = 999;

  test("should throw a non setted version error", () => {
    const call = () => {
      createIDXRestApi({ token: mockedToken });
    };

    expect(call).toThrow(
      new Error(`You did not specify Identix API version.
      Available versions: ${apiVersions.join(", ")}`)
    );
  });

  test("should throw a non existed version error", () => {
    const call = () => {
      createIDXRestApi({ token: mockedToken, version: nonExistedVersion });
    };

    expect(call).toThrow(
      new Error(
        `You have specified a non-existent version of Identix API: ${nonExistedVersion}.
      Available versions: ${apiVersions.join(", ")}`
      )
    );
  });

  test("should create an IDXWsApiV1 with correct parameters", () => {
    const IDXRestApiInstanse = createIDXRestApi({
      token: mockedToken,
      version: existedVersions[0],
    });

    expect(IDXRestApiInstanse).toBeInstanceOf(ApiFacadeV1);

    expect(IDXRestApiInstanse.auth).toBeInstanceOf(AuthV1);
    expect(IDXRestApiInstanse.entries).toBeInstanceOf(EntriesV1);
    expect(IDXRestApiInstanse.users).toBeInstanceOf(UsersV1);
    expect(IDXRestApiInstanse.notifications).toBeInstanceOf(NotificationsV1);
    expect(IDXRestApiInstanse.sources).toBeInstanceOf(SourcesV1);
    expect(IDXRestApiInstanse.utilities).toBeInstanceOf(UtilitiesV1);
    expect(IDXRestApiInstanse.persons).toBeInstanceOf(PersonsV1);
  });
});
