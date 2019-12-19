import { removeEmpty, isEmpty } from "./utils";
import qs from "qs";
import { HttpClientInterface } from "./idx-rest-api/api-facade/auth";

function prepareUrlParams(params: {}): {} {
  const paramsWithValues = removeEmpty(params);

  return !isEmpty(paramsWithValues) ? paramsWithValues : {};
}

type RequestData = FormData | {};

type ResponseData = { data: {} };

interface RequestClientInterface {
  defaults: { baseURL?: string; headers?: { Authorization?: string } };
  get(url: string, config?: { params?: {} }): Promise<ResponseData>;
  post(url: string, data?: RequestData): Promise<ResponseData>;
  put(url: string, data?: RequestData): Promise<ResponseData>;
  delete(
    url: string,
    config?: {
      params?: {};
    }
  ): Promise<ResponseData>;
}

interface RequestClientCreatorSettingsInterface {
  baseURL?: string;
  headers?: { "Content-Type": string; token?: string };
  paramsSerializer?(params: any): string;
}

interface RequestClientCreatorInterface {
  create(
    settings: RequestClientCreatorSettingsInterface
  ): RequestClientInterface;
}

interface RequestClientCreatorSettingsInterface {
  baseURL?: string;
  token?: string;
}

function createHttpClient({
  client,
}: {
  client: RequestClientCreatorInterface;
}): {
  new (settings: RequestClientCreatorSettingsInterface): HttpClientInterface;
} {
  return class HttpClient implements HttpClientInterface {
    private client: RequestClientInterface;

    constructor({ baseURL, token }: RequestClientCreatorSettingsInterface) {
      Object.assign(this, { baseURL, token });

      const headers: {
        "Content-Type": string;
        token?: string;
      } = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.token = `Token ${token}`;
      }

      this.client = client.create({
        baseURL,
        headers,
        paramsSerializer: function(params) {
          return qs.stringify(params, { arrayFormat: "comma" });
        },
      });
    }

    setToken(token: string): void {
      if (token && this.client.defaults.headers) {
        this.client.defaults.headers["Authorization"] = `Token ${token}`;
      }
    }

    deleteToken(): void {
      if (this.client.defaults.headers) {
        delete this.client.defaults.headers["Authorization"];
      }
    }

    setBaseURL(baseURL: string): void {
      if (baseURL) {
        this.client.defaults.baseURL = baseURL;
      }
    }

    post(url: string, data?: RequestData): Promise<{}> {
      let preparedData = data;

      if (data && !(data instanceof FormData)) {
        preparedData = removeEmpty(data);
      }

      return this.client.post(url, preparedData).then(({ data }) => data);
    }

    get(url: string, params?: {}): Promise<{}> {
      const config: { params?: {} } = {};

      if (params) {
        config.params = prepareUrlParams(params);
      }

      if (!isEmpty(config)) {
        return this.client.get(url, config).then(({ data }) => data);
      } else {
        return this.client.get(url).then(({ data }) => data);
      }
    }

    put(url: string, data?: RequestData): Promise<{}> {
      let preparedData = data;

      if (data && !(data instanceof FormData)) {
        preparedData = removeEmpty(data);
      }

      return this.client.put(url, preparedData).then(({ data }) => data);
    }

    delete(url: string, params?: {}): Promise<{}> {
      const config: { params?: {} } = {};

      if (params) {
        config.params = prepareUrlParams(params);
      }

      if (!isEmpty(config)) {
        return this.client.delete(url, config).then(({ data }) => data);
      } else {
        return this.client.delete(url).then(({ data }) => data);
      }
    }
  };
}

export { createHttpClient };
