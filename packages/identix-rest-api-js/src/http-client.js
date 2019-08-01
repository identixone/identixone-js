import { removeEmpty, isEmpty } from "./utils";
import qs from "qs";

function getUrlWithParams(url, params = {}) {
  const preparedParams = removeEmpty(params);

  const preparedData = removeEmpty({
    params: !isEmpty(preparedParams) ? preparedParams : undefined,
  });

  const requestParams = [url]
    .concat(!isEmpty(preparedData) ? preparedData : undefined)
    .filter(Boolean);

  return requestParams;
}

export default ({ client }) =>
  class HttpClient {
    constructor({ baseURL, token }) {
      Object.assign(this, { baseURL, token });

      this._client = client.create({
        baseURL,
        headers: {
          "Content-Type": "application/json",
          Authorization: token && `Token ${token}`,
        },
        paramsSerializer: function(params) {
          return qs.stringify(params, { arrayFormat: "comma" });
        },
      });
    }

    setToken(token) {
      if (token) {
        this._client.defaults.headers["Authorization"] = `Token ${token}`;
      }
    }

    deleteToken() {
      delete this._client.defaults.headers["Authorization"];
    }

    setBaseURL(baseURL) {
      if (baseURL) {
        this._client.defaults.baseURL = baseURL;
      }
    }

    post(url, data) {
      let preparedData = data;

      if (!(data instanceof FormData)) {
        preparedData = removeEmpty(data);
      }

      return this._client.post(url, preparedData).then(({ data }) => data);
    }

    get(url, params = {}) {
      if (!params) {
        params = {};
      }

      return this._client
        .get(...getUrlWithParams(url, params))
        .then(({ data }) => data);
    }

    put(url, data) {
      let preparedData = data;

      if (!(data instanceof FormData)) {
        preparedData = removeEmpty(data);
      }

      return this._client.put(url, preparedData).then(({ data }) => data);
    }

    delete(url, params = {}, data) {
      let preparedData = data;

      if (!params) {
        params = {};
      }

      if (!(data instanceof FormData)) {
        preparedData = removeEmpty(data);
      }

      return this._client
        .delete(...getUrlWithParams(url, params), { data: preparedData })
        .then(({ data }) => ({ data }));
    }
  };
