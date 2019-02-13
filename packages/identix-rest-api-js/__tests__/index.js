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

  describe("Sources module test", () => {
    const mockedSource = {
      name: "My new awesome source",
      identify_resolution_threshold: 7000,
      pps_timestamp: 1000,
    };

    test("getSources: should return correct array of sources", () => {
      const mockedSources = [mockedSource];

      api.sources.getSources().then(thenFn);

      expect(axios.get).toHaveBeenCalledWith("sources/");

      axios.mockResponse({ data: mockedSources });

      expect(thenFn).toHaveBeenCalledWith(mockedSources);
    });

    test("createSource: should send POST request with correct data", () => {
      api.sources.createSource(mockedSource).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("sources/", mockedSource);
    });

    test("getSource: should return correct source object", () => {
      const sourceId = 1;

      api.sources.getSource(sourceId).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(`sources/${sourceId}/`);

      axios.mockResponse({ data: mockedSource });

      expect(thenFn).toHaveBeenCalledWith(mockedSource);
    });

    test("updateSource: should send PUT request with correct data", () => {
      const sourceId = 1;

      api.sources.updateSource({ id: sourceId, ...mockedSource }).then(thenFn);

      expect(axios.put).toHaveBeenCalledWith(
        `sources/${sourceId}/`,
        mockedSource
      );

      axios.mockResponse({ data: mockedSource });

      expect(thenFn).toHaveBeenCalledWith(mockedSource);
    });

    test("deleteSource: should send DELETE request with correct data", () => {
      const sourceId = 1;

      api.sources.deleteSource(sourceId).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(`sources/${sourceId}/`);
    });
  });

  describe("Users module test", () => {
    const mockedToken = {
      name: "My new awesome token",
    };

    test("getTokens: should return correct array of tokens", () => {
      const mockedTokens = [mockedToken];

      api.users.getTokens().then(thenFn);

      expect(axios.get).toHaveBeenCalledWith("users/tokens/");

      axios.mockResponse({ data: mockedTokens });

      expect(thenFn).toHaveBeenCalledWith(mockedTokens);
    });

    test("getUser: should return correct user data", () => {
      const mockedUserData = {
        username: "MyMockedName",
        group: "MyMockedGroup"
      };

      api.users.getTokens().then(thenFn);

      expect(axios.get).toHaveBeenCalledWith("users/me/");

      axios.mockResponse({ data: mockedUserData });

      expect(thenFn).toHaveBeenCalledWith(mockedUserData);
    });

    test("createToken: should send POST request with correct data", () => {
      api.users.createToken(mockedToken).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("login/permanent/", mockedToken);
    });

    test("updateToken: should send PUT request with correct data", () => {
      const tokenId = 1;

      api.users.updateToken({ id: tokenId, ...mockedToken }).then(thenFn);

      expect(axios.put).toHaveBeenCalledWith(
        `users/tokens/${tokenId}/`,
        mockedToken
      );

      axios.mockResponse({ data: mockedToken });

      expect(thenFn).toHaveBeenCalledWith(mockedToken);
    });

    test("deleteToken: should send DELETE request with correct data", () => {
      const tokenId = 1;

      api.users.deleteToken(tokenId).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(`users/tokens/${tokenId}/`);
    });

    test("deleteTokens: should send DELETE request with correct data", () => {
      api.users.deleteTokens({ permanent: true }).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(`users/tokens/`, {
        params: { permanent: true },
      });
    });
  });

  describe("Utilities module test", () => {
    test("comparePhotos: should send POST request with correct data", () => {
      const mockedDataToCompare = {
        photo1: mockedFile,
        photo2: mockedFile,
        conf: "ha",
      };

      const expectedData = {
        conf: "ha",
        photo1: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
        photo2: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
      };

      api.utilities.comparePhotos(mockedDataToCompare).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("utility/compare/", {
        _data: expectedData,
      });
    });

    test("findOutCustomer: should send POST request with correct data", () => {
      const mockedData = {
        source: "webcam",
        offset: 100,
      };

      api.utilities.findOutCustomer(mockedData).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith("utility/customer/", {
        params: mockedData,
      });
    });
  });
});
