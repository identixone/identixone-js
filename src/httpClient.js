import axios from "axios";

export class HttpClient {
  constructor({ baseURL, token, client = axios }) {
    this._client = client.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }

  setToken(token) {
    this._client.defaults.headers["Authorization"] = `Token ${token}`;
  }

  post(url, data) {
    return this._client.post(url, data).then(({ data }) => data);
  }

  get(url, params) {
    return this._client.get(url, { params }).then(({ data }) => data);
  }

  put(url, data) {
    return this._client.put(url, data).then(({ data }) => data);
  }

  delete(url) {
    return this._client.delete(url).then(({ data }) => ({ data }));
  }
}
