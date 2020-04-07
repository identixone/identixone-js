import { Api } from "../../../../base/api";
import {
  UsersInterface,
  GetTokensParamsInterface,
  CreateTokenParamsInterface,
  UpdateTokenParamsInterface,
  DeleteTokensInterface,
  ChangePasswordInterface,
} from "../../../api-facade/v1/users";
import {
  UserInterface,
  AuthUserInterface,
  TokenInterface,
} from "../../../api-facade/auth";

const USERS_TOKENS = "users/tokens/";

class Users extends Api implements UsersInterface {
  getUser(): Promise<UserInterface> {
    return this.httpClient.get("users/me/");
  }

  getTokens(params: GetTokensParamsInterface): Promise<{}> {
    return this.httpClient.get(USERS_TOKENS, params);
  }

  createToken(data: CreateTokenParamsInterface): Promise<AuthUserInterface> {
    return this.httpClient.post(`login/permanent/`, data);
  }

  updateToken(data: UpdateTokenParamsInterface): Promise<TokenInterface> {
    const { is_active, key, id } = data || {};

    const tokenId = id || key;

    if (!tokenId) {
      return Promise.reject("Token id did not provided");
    }

    return this.httpClient.put(`${USERS_TOKENS}${id || key}/`, { is_active });
  }

  deleteToken(tokenId: number | string): Promise<{}> {
    return this.httpClient.delete(`${USERS_TOKENS}${tokenId}/`);
  }

  deleteTokens(data: DeleteTokensInterface): Promise<{}> {
    const { permanent } = data || {};

    return this.httpClient.delete(USERS_TOKENS, { permanent });
  }

  changePassword(data: ChangePasswordInterface): Promise<{}> {
    return this.httpClient.post("users/password/change/", data);
  }
}

export { Users };
