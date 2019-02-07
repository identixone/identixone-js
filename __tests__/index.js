import path from "path";
import { File } from "file-api";
import { FormData } from "./__mocks__/form-data";
import { readFile } from "./__helpers__";

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
const pathToMockedImage = path.resolve(__dirname, "./__mocks__/mock.jpg");

global.FormData = FormData;

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

  let thenFn;
  let mockedFile;

  beforeAll(done => {
    readFile(pathToMockedImage).then(fileBuffer => {
      mockedFile = new File({ buffer: fileBuffer, name: "handsome.jpg" });

      done();
    });
  });

  beforeEach(() => {
    thenFn = jest.fn();
  });

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
      transport: 0,
      http_method: 0,
      destination_url: "https://mocked.com",
      conf_thresholds: [1],
      age_from: 20,
      age_to: 25,
      sex: 1,
      moods: [0],
      sources: ["webcam"],
    };

    test("getNotifications: should return correct array of notifications", () => {
      const mockedNotifications = [mockedNotification];

      api.notifications.getNotifications().then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(SETTINGS_NOTIFICATIONS, {
        params: undefined,
      });

      axios.mockResponse({ data: mockedNotifications });

      expect(thenFn).toHaveBeenCalledWith(mockedNotifications);
    });

    test("getNotification: should return correct notification object", () => {
      const notificationId = 1;

      api.notifications.getNotification(notificationId).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(
        `${SETTINGS_NOTIFICATIONS}${notificationId}/`,
        { params: undefined }
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
        liveness: true,
      };

      const expectedData = {
        asm: true,
        liveness: true,
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
        create_on_ha: true,
        create_on_junk: false,
        asm: true,
      };

      const expectedData = {
        source: "webcam",
        facesize: 100,
        create_on_ha: true,
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

    test("deletePerson: should send DELETE request with correct URL", () => {
      const personId = 42;

      api.persons.deletePerson(personId).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(`persons/${personId}/`);
    });

    test("reinitializePersonByRecord: should send POST request with correct data", () => {
      const recordId = 42;
      const facesize = 100;

      api.persons
        .reinitializePersonByRecord({ recordId, facesize })
        .then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("persons/reinit/", {
        id: recordId,
        facesize,
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

  describe("Records module test", () => {
    const mockedRecord = {
      id: 1,
      initial_photo: "https://mocked.com/records/initial/1",
      detected_photo: "https://mocked.com/records/detected/1",
      facesize: 10,
      conf: "ha",
      detected: "2008-09-15T15:53:00",
      created: "2008-09-15T15:53:00",
      age: 12,
      sex: 0,
      mood: "fear",
      source: "webcam",
    };

    test("getRecords: should return correct array of records", () => {
      const mockedRecords = [mockedRecord];

      api.records.getRecords().then(thenFn);

      expect(axios.get).toHaveBeenCalledWith("records/", {
        params: {},
      });

      axios.mockResponse({ data: mockedRecords });

      expect(thenFn).toHaveBeenCalledWith(mockedRecords);
    });

    test("getRecordsByPersonId: should return correct array of records", () => {
      const personId = 1;

      api.records
        .getRecordsByPersonId({ personId, filters: { exact: true } })
        .then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(`records/${personId}/`, {
        params: {
          exact: true,
        },
      });

      axios.mockResponse({ data: mockedRecord });

      expect(thenFn).toHaveBeenCalledWith(mockedRecord);
    });

    test("deleteRecord: should send DELETE request with correct data", () => {
      const recordId = 1;

      api.records.deleteRecord(recordId).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(`entry/${recordId}/`);
    });
  });
});
