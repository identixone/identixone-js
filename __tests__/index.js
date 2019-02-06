import axios from "./__mocks__/axios";
import createHttpCilent from "../src/httpClient";

import createIdxApi from "../src/IdxApi";

import Auth from "../src/auth";
import Users from "../src/users";
import Records from "../src/records";
import Notifications from "../src/notifications";
import Sources from "../src/sources";
import Utilities from "../src/utilities";
import Persons from "../src/persons";

const endpoint = "https://api.mocked.com";

describe("IdxApi test", () => {
  const ApiCreator = createIdxApi({
    Auth,
    Users,
    Records,
    Notifications,
    Sources,
    Utilities,
    Persons,
    HttpClient: createHttpCilent({ client: axios }),
  });

  const api = new ApiCreator({ endpoint, token: "mocked token" });

  afterEach(() => {
    axios.reset();
  });

  describe("Auth module test", () => {
    const username = "Jane Doe";
    const password = "04.09.2001";

    const mockedData = {
      user: "Jane",
      token: "mocked token",
    };

    let thenFn;

    beforeEach(() => {
      thenFn = jest.fn();
    });

    describe("login/logout", () => {
      test("login: should send POST request to API server with data on correct endpoint", () => {
        api.auth.login(username, password).then(thenFn);

        expect(axios.post).toHaveBeenCalledWith("login/", {
          username,
          password,
        });

        axios.mockResponse({ data: mockedData });

        expect(thenFn).toHaveBeenCalledWith(mockedData);
      });

      test("logout: should send DELETE request to API server on correct endpoint", () => {
        const tokenId = 4;

        api.auth.logout(tokenId);

        expect(axios.delete).toHaveBeenCalledWith(`/users/tokens/${tokenId}/`);
      });
    });

    describe("tokens test", () => {
      test("generateToken: should send POST request to API server on correct endpoint", () => {
        api.auth.generateToken().then(thenFn);

        expect(axios.post).toHaveBeenCalledWith("login/", undefined);

        axios.mockResponse({ data: mockedData });

        expect(thenFn).toHaveBeenCalledWith(mockedData);
      });

      test("generatePermanentToken: should send POST request to API server with data on correct endpoint", () => {
        api.auth.generatePermanentToken(username, password).then(thenFn);

        expect(axios.post).toHaveBeenCalledWith("login/permanent/", {
          username,
          password,
        });

        axios.mockResponse({ data: mockedData });

        expect(thenFn).toHaveBeenCalledWith(mockedData);
      });
    });
  });
});
