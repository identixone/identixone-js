import {
  post,
  get,
  deletes,
  headersAddBearerToken,
  CONTENT_TYPE_HEADERS,
} from "../request.js";
import Api from "../Api";

const RECORDS = "records";

export default class Records extends Api {
  constructor(props) {
    super(props);
  }

  records(filters) {
    const headers = headersAddBearerToken(this.token);
    return get(`${this.endpoint}/${RECORDS}/`, filters, headers).then(body => {
      return body;
    });
  }

  record({ id, filters = {} }) {
    const headers = headersAddBearerToken(this.token);
    return get(`${this.endpoint}/${RECORDS}/${id}/`, filters, headers).then(
      body => {
        return body;
      }
    );
  }

  deleteRecord(id) {
    const headers = headersAddBearerToken(this.token);
    return deletes(`${this.endpoint}/entry/${id}/`, null, headers).then(
      body => {
        return body;
      }
    );
  }
}
