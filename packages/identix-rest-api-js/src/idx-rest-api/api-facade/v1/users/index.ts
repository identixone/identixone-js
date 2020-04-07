import { AuthUserInterface, TokenInterface, UserInterface } from "../../auth";
import { numeric } from "../../../../base/types";

export interface TokenIdInterface {
  id?: numeric;
  key?: string;
}

export interface GetTokensParamsInterface {
  permanent?: boolean;
}

export interface CreateTokenParamsInterface {
  username: string;
  password: string;
}

export interface UpdateTokenParamsInterface extends TokenIdInterface {
  is_active: boolean;
}

export interface DeleteTokensInterface {
  permanent?: boolean;
}

export interface ChangePasswordInterface {
  old_password: string;
  password: string;
  password2: string;
  reset_tokens?: boolean;
}

export interface UsersInterface {
  getUser(): Promise<UserInterface>;

  getTokens(params: GetTokensParamsInterface): Promise<{}>;
  createToken(params: CreateTokenParamsInterface): Promise<AuthUserInterface>;
  updateToken(params: UpdateTokenParamsInterface): Promise<TokenInterface>;
  deleteToken(tokenId: string | number): Promise<{}>;
  deleteTokens(params: DeleteTokensInterface): Promise<{}>;

  changePassword(params: ChangePasswordInterface): Promise<{}>;
}
