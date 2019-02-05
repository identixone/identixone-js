import Api from "../Api";

const RECORDS = "records/";

export default class Records extends Api {
  getRecords(filters) {
    return this.httpClient.get(RECORDS, filters);
  }

  getRecordsByPersonId({ personId, filters = {} }) {
    return this.httpClient.get(`${RECORDS}${personId}/`, filters);
  }

  deleteRecord(id) {
    return this.httpClient.delete(`/entry/${id}/`);
  }
}
