import Api from "../../../../base/api";

import { removeEmpty } from "../../../../utils";

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
    last
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
    last
  });

  getRecords(filters) {
    return this.httpClient.get(
      RECORDS,
      filters ? removeEmpty(Records.getFiltersData(filters)) : undefined
    );
  }

  getRecordsByPersonId({ personId, filters } = {}) {
    return this.httpClient.get(
      `${RECORDS}${personId}/`,
      filters ? removeEmpty(Records.getFiltersData(filters)) : undefined
    );
  }

  deleteRecord(id) {
    return this.httpClient.delete(`entry/${id}/`);
  }
}
