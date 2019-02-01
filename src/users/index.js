import Api from "../Api";

const USERS_TOKENS = "users/tokens/";

export default class Users extends Api {
  getTokens(params = {}) {
    return this.httpClient.get(USERS_TOKENS, params);
  }

  addToken(data) {
    return this.httpClient.post(`login/permanent/`, data);
  }

  updateToken(source) {
    return this.httpClient.put(`${USERS_TOKENS}${source.id}/`, source);
  }

  deleteToken(id) {
    return this.httpClient.delete(`${USERS_TOKENS}${id}/`);
  }

  deleteTokens({ permanent }) {
    return this.httpClient.delete(USERS_TOKENS, { permanent });
  }
}
