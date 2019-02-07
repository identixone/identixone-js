import Api from "../Api";

import { removeEmpty } from "../utils";

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
    qty,
    pgn_start,
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
    qty,
    pgn_start,
  });

  getRecords(data = {}) {
    return this.httpClient.get(
      RECORDS,
      removeEmpty(Records.getFiltersData(data))
    );
  }

  getRecordsByPersonId({ personId, filters = {} } = {}) {
    return this.httpClient.get(
      `${RECORDS}${personId}/`,
      removeEmpty(Records.getFiltersData(filters))
    );
  }

  deleteRecord(id) {
    return this.httpClient.delete(`entry/${id}/`);
  }
}
