/* eslint-disable quote-props */
import { IDX_ENDPOINT } from "../../../../../configs/api.js";
import records from "./records.js";

export default {
  pattern: `${IDX_ENDPOINT}/records/`,

  fixtures(match, params, headers) {
    return {
      result: "ok",
      totalqty: 64,
      records: records,
      sources: [
        {
          name: "new",
          qty: 63,
          new: 38,
          exact: 20,
          ha: 1,
          junk: 3,
          det: 0,
          reinit: 0,
          nm: 1,
        },
        {
          name: "upload",
          qty: 1,
          new: 1,
          exact: 0,
          ha: 0,
          junk: 0,
          det: 0,
          reinit: 0,
          nm: 0,
        },
      ],
    };
  },

  post(match, data) {
    return {
      ok: true,
      body: data,
    };
  },

  get(match, data) {
    return {
      ok: true,
      body: data,
    };
  },
};
