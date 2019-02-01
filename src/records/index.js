import Api from "../Api";

const RECORDS = "records/";

export default class Records extends Api {
  records(filters) {
    return this.httpClient.get(RECORDS, filters);
  }

  record({ id, filters = {} }) {
    return this.httpClient.get(`${RECORDS}${id}/`, filters);
  }

  deleteRecord(id) {
    return this.httpClient.delete(`/entry/${id}/`);
  }
}
