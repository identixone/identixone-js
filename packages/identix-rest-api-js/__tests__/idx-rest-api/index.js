import path from "path";
import { File } from "file-api";
import { readFile } from "../__helpers__";

import axios from "axios";
import { FormData } from "form-data";

import { createHttpClient } from "../../src/http-client";

import { ApiFacadeV1 } from "../../src/idx-rest-api/api-facade/v1";

import { Auth as AuthV1 } from "../../src/idx-rest-api/features/auth/v1";
import { Users as UsersV1 } from "../../src/idx-rest-api/features/users/v1";
import { Entries as EntriesV1 } from "../../src/idx-rest-api/features/entries/v1";
import { Notifications as NotificationsV1 } from "../../src/idx-rest-api/features/notifications/v1";
import { Sources as SourcesV1 } from "../../src/idx-rest-api/features/sources/v1";
import { Utilities as UtilitiesV1 } from "../../src/idx-rest-api/features/utilities/v1";
import { Persons as PersonsV1 } from "../../src/idx-rest-api/features/persons/v1";

jest.mock("axios");
jest.mock("form-data");

const endpoint = "https://api.mocked.com";
const pathToMockedImage = path.resolve(__dirname, "../__mocks__/mock.jpg");

global.FormData = FormData;

describe("IdxApi test", () => {
  const HttpClient = createHttpClient({ client: axios });
  const httpClient = new HttpClient({
    baseURL: endpoint,
    token: "mocked_token",
  });

  const api = new ApiFacadeV1({
    httpClient,
    auth: new AuthV1({ httpClient }),
    notifications: new NotificationsV1({ httpClient }),
    entries: new EntriesV1({ httpClient }),
    persons: new PersonsV1({ httpClient }),
    sources: new SourcesV1({ httpClient }),
    users: new UsersV1({ httpClient }),
    utilities: new UtilitiesV1({ httpClient }),
  });

  let thenFn;
  let mockedFile;

  beforeAll(done => {
    readFile(pathToMockedImage).then(fileBuffer => {
      mockedFile = new File({
        buffer: fileBuffer,
        name: "handsome.jpg",
        type: "image/jpeg",
      });

      done();
    });
  });

  beforeEach(() => {
    thenFn = jest.fn();
  });

  afterEach(() => {
    axios.reset();
  });

  describe("Init test", () => {
    test("should call login with correct params, call setToken, return correct body", () => {
      const username = "Jane Doe";
      const password = "04.09.2001";

      const mockedData = {
        user: "Jane",
        token: "mocked token",
      };

      api.init(username, password).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("login/", {
        username,
        password,
      });

      axios.mockResponse({ data: mockedData });

      expect(thenFn).toHaveBeenCalledWith(mockedData);
    });
  });

  describe("SetToken test", () => {
    test("should set default AUTH header with token to the client instance", () => {
      const mockedToken = "mocked token";

      api.setToken(mockedToken);

      expect(api.httpClient.client.defaults.headers.Authorization).toEqual(
        `Token ${mockedToken}`
      );
    });
  });

  describe("Auth module test", () => {
    const username = "Jane Doe";
    const password = "04.09.2001";

    const mockedData = {
      user: "Jane",
      token: "mocked token",
    };

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

  describe("Notifications module test", () => {
    const SETTINGS_NOTIFICATIONS = "settings/notifications/";
    const mockedNotification = {
      is_active: false,
      http_method: 0,
      destination_url: "https://mocked.com",
      conf_thresholds: [1],
      age_from: 20,
      age_to: 25,
      sex: 1,
      moods: [0],
      sources: ["webcam"],
      persons_groups: ["some", "persons groups"],
    };

    test("getNotifications: should return correct array of notifications", () => {
      const mockedNotifications = [mockedNotification];

      api.notifications
        .getNotifications({ q: "some q", limit: 20, offset: 0 })
        .then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(SETTINGS_NOTIFICATIONS, {
        params: { q: "some q", limit: 20, offset: 0 },
      });

      axios.mockResponse({ data: mockedNotifications });

      expect(thenFn).toHaveBeenCalledWith(mockedNotifications);
    });

    test("getNotification: should return correct notification object", () => {
      const notificationId = 1;

      api.notifications.getNotification(notificationId).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(
        `${SETTINGS_NOTIFICATIONS}${notificationId}/`
      );

      axios.mockResponse({ data: mockedNotification });

      expect(thenFn).toHaveBeenCalledWith(mockedNotification);
    });

    test("createNotification: should send POST request with correct data", () => {
      api.notifications.createNotification(mockedNotification).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith(
        SETTINGS_NOTIFICATIONS,
        mockedNotification
      );

      axios.mockResponse({ data: mockedNotification });

      expect(thenFn).toHaveBeenCalledWith(mockedNotification);
    });

    test("updateNotification: should send PUT request with correct data", () => {
      const notificationId = 1;

      api.notifications
        .updateNotification({ id: notificationId, ...mockedNotification })
        .then(thenFn);

      expect(axios.put).toHaveBeenCalledWith(
        `${SETTINGS_NOTIFICATIONS}${notificationId}/`,
        mockedNotification
      );

      axios.mockResponse({ data: mockedNotification });

      expect(thenFn).toHaveBeenCalledWith(mockedNotification);
    });

    test("deleteNotification: should send DELETE request with correct data", () => {
      const notificationId = 1;

      api.notifications.deleteNotification(notificationId).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(
        `${SETTINGS_NOTIFICATIONS}${notificationId}/`
      );
    });
  });

  describe("Persons module test", () => {
    const mockedPerson = {
      age: 20,
      mood: "fear",
      source: "webcam",
    };

    test("searchPersonByImage: should return correct person object", () => {
      const personData = {
        photo: mockedFile,
        asm: true,
      };

      const expectedData = {
        asm: true,
        photo: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
      };

      api.persons.searchPersonByImage(personData).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("persons/search/", {
        _data: expectedData,
      });

      axios.mockResponse({ data: mockedPerson });

      expect(thenFn).toHaveBeenCalledWith(mockedPerson);
    });

    test("createPerson: should send POST request with correct data", () => {
      const personData = {
        photo: mockedFile,
        source: "webcam",
        facesize: 100,
        create_on_junk: false,
        create_on_ha: undefined,
        asm: true,
      };

      const expectedData = {
        source: "webcam",
        facesize: 100,
        create_on_junk: false,
        asm: true,
        photo: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
      };

      api.persons.createPerson(personData).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("persons/", {
        _data: expectedData,
      });

      axios.mockResponse({ data: mockedPerson });

      expect(thenFn).toHaveBeenCalledWith(mockedPerson);
    });

    test("createPersonFromEntry: should send POST request with correct data", () => {
      const entryId = 42;
      const create_on_ha = false;
      const create_on_junk = false;

      api.persons
        .createPersonFromEntry({
          entryId,
          create_on_ha,
          create_on_junk,
        })
        .then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("persons/entry/", {
        id: entryId,
        create_on_ha,
        create_on_junk,
      });
    });

    test("deletePerson: should send DELETE request with correct URL", () => {
      const personId = 42;

      api.persons.deletePerson(personId).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(`persons/${personId}/`);
    });

    test("reinitializePersonByEntry: should send POST request with correct data", () => {
      const entryId = 42;

      api.persons.reinitializePersonByEntry({ entryId }).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("persons/reinit/", {
        id: entryId,
      });
    });

    test("reinitializePersonByImage: should send POST request with correct data", () => {
      const personId = 1;

      const personData = {
        personId,
        photo: mockedFile,
        source: "webcam",
        facesize: 10,
        conf: "ha",
      };

      const expectedData = {
        source: "webcam",
        facesize: 10,
        conf: "ha",
        photo: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
      };

      api.persons.reinitializePersonByImage(personData).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith(`persons/reinit/${personId}`, {
        _data: expectedData,
      });

      axios.mockResponse({ data: mockedPerson });

      expect(thenFn).toHaveBeenCalledWith(mockedPerson);
    });
  });

  describe("Entries module test", () => {
    const mockedEntry = {
      id: 1,
      created: "2008-09-15T15:53:00",
      photo: "https://mocked.com/entries/detected/1",
      initial_photo: "https://mocked.com/entries/initial/1",
      source: {
        id: 0,
        name: "webcam",
      },
      facesize: 10,
      age: 12,
      sex: 0,
      mood: "fear",
      liveness: "passed",
      conf: "ha",
      detected: "2008-09-15T15:53:00",
    };

    test("getEntries: should return correct array of entries", () => {
      const mockedEntries = [mockedEntry];
      const mockedFilters = {
        idxid: "1,2",
        conf: "some_conf",
        liveness: "some_liveness",
        source: 2,
        id_from: 100,
        date_from: "some_date_from",
        date_to: "some_date_to",
        limit: 100,
        offset: 20,
        mood: "happiness,fear",
        age_from: 10,
        age_to: 13,
        sex: "0,1",
      };

      api.entries.getEntries(mockedFilters).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith("entries/", {
        params: mockedFilters,
      });

      axios.mockResponse({ data: mockedEntries });

      expect(thenFn).toHaveBeenCalledWith(mockedEntries);
    });

    test("getEntriesLive: should return correct array of entries", () => {
      const mockedEntries = [mockedEntry];
      const mockedFilters = {
        conf: "some_conf",
        source: 2,
        id_from: 100,
        limit: 100,
      };

      api.entries.getEntriesLive(mockedFilters).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith("entries/live/", {
        params: mockedFilters,
      });

      axios.mockResponse({ data: mockedEntries });

      expect(thenFn).toHaveBeenCalledWith(mockedEntries);
    });

    test("getEntriesStatsByPersonId: should return correct object with stats of a person", () => {
      const personId = 1;

      api.entries.getEntriesStatsByPersonId(personId).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(
        `entries/stats/idxid/${personId}/`
      );

      axios.mockResponse({ data: mockedEntry });

      expect(thenFn).toHaveBeenCalledWith(mockedEntry);
    });

    test("deleteEntry: should send DELETE request with correct data", () => {
      const entryId = 1;

      api.entries.deleteEntry(entryId).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(`entries/${entryId}/`);
    });
  });

  describe("Sources module test", () => {
    const mockedSource = {
      name: "My new awesome source",
      identify_facesize_threshold: 7000,
      pps_timestamp: 1000,
    };

    test("getSources: should return correct array of sources", () => {
      const mockedSources = [mockedSource];

      api.sources
        .getSources({ q: "some q", limit: 20, offset: 0 })
        .then(thenFn);

      expect(axios.get).toHaveBeenCalledWith("sources/", {
        params: { q: "some q", limit: 20, offset: 0 },
      });

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

    test("createToken: should send POST request with correct data", () => {
      api.users.createToken(mockedToken).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("login/permanent/", mockedToken);
    });

    test("updateToken: should send PUT request with correct data", () => {
      const tokenId = 1;

      api.users.updateToken({ id: tokenId, is_active: false }).then(thenFn);

      expect(axios.put).toHaveBeenCalledWith(`users/tokens/${tokenId}/`, {
        is_active: false,
      });

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

    test("getUser: should return correct user data", () => {
      const mockedUserData = {
        username: "MyMockedName",
        group: "MyMockedGroup",
      };

      api.users.getUser().then(thenFn);

      expect(axios.get).toHaveBeenCalledWith("users/me/");

      axios.mockResponse({ data: mockedUserData });

      expect(thenFn).toHaveBeenCalledWith(mockedUserData);
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

    test("verifyPersonPhotoWithDocumentPhoto: should send POST request with correct data", () => {
      const mockedDataToVerify = {
        photo_face: mockedFile,
        photo_face_facesize: 2000,
        photo_id: mockedFile,
        photo_id_facesize: 2000,
        id_code: "ru",
        conf: "exact",
      };

      const expectedData = {
        photo_face: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
        photo_face_facesize: 2000,
        photo_id: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
        id_code: "ru",
        photo_id_facesize: 2000,
        conf: "exact",
      };

      api.utilities
        .verifyPersonPhotoWithDocumentPhoto(mockedDataToVerify)
        .then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("faceid/verification/", {
        _data: expectedData,
      });
    });
  });
});
