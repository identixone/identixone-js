export default class Api {
  constructor({ token, endpoint }) {
    this.setToken(token);
    this.endpoint = endpoint;
  }

  setToken(token) {
    this.token = token;
  }
}
