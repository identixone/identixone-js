import Api from "../Api";

/**
 * Authorization Identix api.
 */
export default class Auth extends Api {
  /**
   * @param {string} username - user name.
   * @param {string} password - user password.
   * @return {Promise} Promise object represents the response object
   */
  login(username, password) {
    return this.httpClient
      .post("login/", { username, password })
      .then(({ token, user }) => ({ token, user }));
  }

  /**
   * @return {Promise} Promise object represents the response object
   */
  generateToken() {
    return this.httpClient
      .post(`login/`)
      .then(({ token, user }) => ({ token, user }));
  }

  /**
   * @param {string} username - user name.
   * @param {string} password - user password.
   * @return {Promise} Promise object represents the response object
   */
  generatePermanentToken(username, password) {
    return this.httpClient
      .post("login/permanent/", { username, password })
      .then(({ token, user }) => ({ token, user }));
  }

  //TODO: save auth tokenId and add by default into this logout
  /**
   * @param {string} tokenId - token id (got it with login response).
   * @return {Promise} Promise object represents the response object
   */
  logout(tokenId) {
    return this.httpClient.delete(`/users/tokens/${tokenId}/`);
  }
}
