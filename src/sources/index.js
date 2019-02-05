import Api from "../Api";

const SOURCES = "sources/";

export default class Sources extends Api {
  getSources() {
    return this.httpClient.get(SOURCES);
  }

  createSource(data) {
    return this.httpClient.post(SOURCES, data);
  }

  updateSource(source) {
    return this.httpClient.put(`${SOURCES}/${source.id}/`, source);
  }

  deleteSource(id) {
    return this.httpClient.delete(`${SOURCES}/${id}/`);
  }
}
