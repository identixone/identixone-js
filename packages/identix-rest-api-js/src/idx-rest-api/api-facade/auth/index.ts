export interface TokenInterface {
  key: string;
  id: number;
  is_active: boolean;
  created: string;
  expires: string;
}

export interface UserInterface {
  username: string;
  group: string;
}

export interface AuthUserInterface {
  token: TokenInterface;
  user: UserInterface;
}

export interface AuthInterface {
  login(username: string, password: string): Promise<AuthUserInterface>;
  logout(tokenId: string): Promise<{}>;
}

export interface HttpClientInterface {
  setToken(token: string): void;
  deleteToken(): void;
  setBaseURL(url: string): void;
}
