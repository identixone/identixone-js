import { AuthInterface, AuthUserInterface, HttpClientInterface } from "./auth";

export interface ApiFacadeSettingsInterface {
  httpClient: HttpClientInterface;
  auth: AuthInterface;
}

export interface ApiFacadeInterface {
  init(username: string, password: string): Promise<AuthUserInterface>;
  setToken(token: string): void;
  deleteToken(): void;
  setEndpoint(endpoint: string): void;

  auth: AuthInterface;
}

class ApiFacade implements ApiFacadeInterface {
  protected httpClient: HttpClientInterface;
  auth: AuthInterface;

  constructor({ httpClient, auth }: ApiFacadeSettingsInterface) {
    this.httpClient = httpClient;
    this.auth = auth;
  }

  init(username: string, password: string): Promise<AuthUserInterface> {
    return this.auth
      .login(username, password)
      .then((body: AuthUserInterface) => {
        const { token } = body;
        this.setToken(token.key);

        return body;
      });
  }

  setToken(token: string): void {
    this.httpClient.setToken(token);
  }

  deleteToken(): void {
    this.httpClient.deleteToken();
  }

  setEndpoint(endpoint: string): void {
    this.httpClient.setBaseURL(endpoint);
  }
}

export { ApiFacade };
