import { removeEmpty, isEmpty } from "./utils";

export default ({ client }) =>
  class HttpClient {
    constructor({ baseURL, token }) {
      this._client = client.create({
        baseURL,
        headers: {
          "Content-Type": "application/json",
          Authorization: token && `Token ${token}`,
        },
      });
    }

    setToken(token) {
      if (token) {
        this._client.defaults.headers["Authorization"] = `Token ${token}`;
      }
    }

    post(url, data) {
      return this._client.post(url, data).then(({ data }) => data);
    }

    get(url, params) {
      const preparedData = removeEmpty({ params });
      const requestParams = [url]
        .concat(!isEmpty(preparedData) ? preparedData : undefined)
        .filter(Boolean);

      return this._client.get(...requestParams).then(({ data }) => data);
    }

    put(url, data) {
      return this._client.put(url, data).then(({ data }) => data);
    }

    delete(url, params) {
      const preparedData = removeEmpty({ params });
      const requestParams = [url]
        .concat(!isEmpty(preparedData) ? preparedData : undefined)
        .filter(Boolean);

      return this._client
        .delete(...requestParams)
        .then(({ data }) => ({ data }));
    }
  };
