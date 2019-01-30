import Users from "./users/index.js";
import Auth from "./auth/index.js";
import Records from "./records/index.js";
import Notifications from "./notifications/index.js";
import Sources from "./sources/index.js";
import Persons from "./persons";

export default class IDXApi {
  constructor({ token = null, endpoint = null }) {
    this.endpoint = endpoint;

    this.auth = new Auth({ token, endpoint });
    this.users = new Users({ token, endpoint });
    this.records = new Records({ token, endpoint });
    this.notifications = new Notifications({ token, endpoint });
    this.sources = new Sources({ token, endpoint });
    this.persons = new Persons({ token, endpoint });
  }

  init(username, password) {
    return this.auth.login(username, password).then(body => {
      const { token } = body;
      this.setToken(token.key);

      return body;
    });
  }

  setToken(token) {
    this.auth.setToken(token);
    this.users.setToken(token);
    this.records.setToken(token);
    this.notifications.setToken(token);
    this.sources.setToken(token);
    this.persons.setToken(token);
  }
}
