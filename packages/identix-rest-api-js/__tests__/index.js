import { createIDXRestApi } from "../src/idx-rest-api";
import { IDXRestApi } from "../src/idx-rest-api/idx-rest-api";
import { apiVersions, apiEndpoints } from "../src/constants";

// Api version 1
import AuthV1 from "../src/idx-rest-api/features/auth/v1";
import UsersV1 from "../src/idx-rest-api/features/users/v1";
import RecordsV1 from "../src/idx-rest-api/features/records/v1";
import NotificationsV1 from "../src/idx-rest-api/features/notifications/v1";
import SourcesV1 from "../src/idx-rest-api/features/sources/v1";
import UtilitiesV1 from "../src/idx-rest-api/features/utilities/v1";
import PersonsV1 from "../src/idx-rest-api/features/persons/v1";

describe("createIDXRestApi test", () => {
  const mockedToken = "token";
  const existedVersions = [1];
  const nonExistedVersion = 999;

  test("should throw a non setted token error", () => {
    const call = () => {
      createIDXRestApi();
    };

    expect(call).toThrow(new Error("You did not specify Identix API token"));
  });

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

    expect(IDXRestApiInstanse).toBeInstanceOf(IDXRestApi);

    expect(IDXRestApiInstanse.httpClient.token).toBe(mockedToken);
    expect(IDXRestApiInstanse.endpoint).toBe(apiEndpoints.v1);

    expect(IDXRestApiInstanse.auth).toBeInstanceOf(AuthV1);
    expect(IDXRestApiInstanse.users).toBeInstanceOf(UsersV1);
    expect(IDXRestApiInstanse.records).toBeInstanceOf(RecordsV1);
    expect(IDXRestApiInstanse.notifications).toBeInstanceOf(NotificationsV1);
    expect(IDXRestApiInstanse.sources).toBeInstanceOf(SourcesV1);
    expect(IDXRestApiInstanse.utilities).toBeInstanceOf(UtilitiesV1);
    expect(IDXRestApiInstanse.persons).toBeInstanceOf(PersonsV1);
  });
});
