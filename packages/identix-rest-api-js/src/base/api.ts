export interface ApiSettingsInterface {
  httpClient: any;
}

class Api {
  protected httpClient: any;

  constructor(settings: ApiSettingsInterface) {
    this.httpClient = settings.httpClient;
  }
}

export { Api };
