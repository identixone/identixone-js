import { Api } from "../../../../base/api";
import { AuthInterface, AuthUserInterface } from "../../../api-facade/auth";

class Auth extends Api implements AuthInterface {
  login(username: string, password: string): Promise<AuthUserInterface> {
    return this.httpClient
      .post("login/", { username, password })
      .then(({ token, user }: AuthUserInterface) => ({
        token,
        user,
      }));
  }

  generateToken(): Promise<AuthUserInterface> {
    return this.httpClient
      .post("login/")
      .then(({ token, user }: AuthUserInterface) => ({ token, user }));
  }

  generatePermanentToken(
    username: string,
    password: string
  ): Promise<AuthUserInterface> {
    return this.httpClient
      .post("login/permanent/", { username, password })
      .then(({ token, user }: AuthUserInterface) => ({ token, user }));
  }

  logout(tokenId: string): Promise<{}> {
    return this.httpClient.delete(`/users/tokens/${tokenId}/`);
  }
}

export { Auth };
