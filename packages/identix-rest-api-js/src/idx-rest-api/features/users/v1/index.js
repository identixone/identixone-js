import Api from "../../../../base/api";

const USERS_TOKENS = "users/tokens/";

export default class Users extends Api {
  getTokens = params => {
    return this.httpClient.get(USERS_TOKENS, params);
  };

  createToken = data => {
    return this.httpClient.post(`login/permanent/`, data);
  };

  updateToken = ({ id, ...restData }) => {
    return this.httpClient.put(`${USERS_TOKENS}${id}/`, restData);
  };

  deleteToken = id => {
    return this.httpClient.delete(`${USERS_TOKENS}${id}/`);
  };

  deleteTokens = ({ permanent } = {}) => {
    return this.httpClient.delete(USERS_TOKENS, { permanent });
  };

  getUser = () => {
    return this.httpClient.get("users/me/");
  };
}
