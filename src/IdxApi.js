export default ({
  HttpClient,
  Auth,
  Users,
  Records,
  Notifications,
  Sources,
  Persons,
  Utility,
}) =>
  class IDXApi {
    constructor({ token = null, endpoint = null }) {
      this.endpoint = endpoint;

      this.httpClient = new HttpClient({
        baseURL: endpoint,
        token,
      });

      this.auth = new Auth({ httpClient: this.httpClient });
      this.users = new Users({ httpClient: this.httpClient });
      this.records = new Records({ httpClient: this.httpClient });
      this.notifications = new Notifications({ httpClient: this.httpClient });
      this.sources = new Sources({ httpClient: this.httpClient });
      this.persons = new Persons({ httpClient: this.httpClient });
      this.utility = new Utility({ httpClient: this.httpClient });
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
  };
