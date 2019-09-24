export class IDXRestApi {
  constructor({
    token = null,
    endpoint = null,
    HttpClient,
    Auth,
    Users,
    Entries,
    Notifications,
    PersonsLists,
    Sources,
    Persons,
    Utilities,
  }) {
    this.endpoint = endpoint;

    this.httpClient = new HttpClient({
      baseURL: endpoint,
      token,
    });

    this.auth = new Auth({ httpClient: this.httpClient });
    this.users = new Users({ httpClient: this.httpClient });
    this.entries = new Entries({ httpClient: this.httpClient });
    this.notifications = new Notifications({ httpClient: this.httpClient });
    this.personsLists = new PersonsLists({ httpClient: this.httpClient });
    this.sources = new Sources({ httpClient: this.httpClient });
    this.persons = new Persons({ httpClient: this.httpClient });
    this.utilities = new Utilities({ httpClient: this.httpClient });
  }

  init(username, password) {
    return this.auth.login(username, password).then(body => {
      const { token } = body;
      this.setToken(token.key);

      return body;
    });
  }

  setToken(token) {
    this.httpClient.setToken(token);
  }

  deleteToken() {
    this.httpClient.deleteToken();
  }

  setEndpoint(endpoint) {
    this.httpClient.setBaseURL(endpoint);
  }
}
