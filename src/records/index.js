import Api from "../Api";

const RECORDS = "records/";

export default class Records extends Api {
  static getFiltersData = ({
    is_new,
    reinit,
    exact,
    ha,
    junk,
    nm,
    det,
    id,
    period_start,
    period_end,
    source,
  }) => ({
    new: is_new,
    reinit,
    exact,
    ha,
    junk,
    nm,
    det,
    id,
    period_start,
    period_end,
    source,
  });

  getRecords(data = {}) {
    return this.httpClient.get(RECORDS, Records.getFiltersData(data));
  }

  getRecordsByPersonId({ personId, filters = {} }) {
    return this.httpClient.get(
      `${RECORDS}${personId}/`,
      Records.getFiltersData(filters)
    );
  }

  deleteRecord(id) {
    return this.httpClient.delete(`/entry/${id}/`);
  }
}
