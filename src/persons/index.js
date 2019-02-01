import { post, deletes, headersAddBearerToken } from "../request";
import { dataURItoBlob } from "../utils/helpers";
import Api from "../Api";

export default class Persons extends Api {
  searchPersonByImage({ photo, ...restData }) {
    const data = new FormData();

    data.append("photo", dataURItoBlob(photo));

    Object.keys(restData).forEach(key => {
      data.append(key, restData[key]);
    });

    const headers = headersAddBearerToken(this.token);

    return post(`${this.endpoint}/persons/search/`, data, headers);
  }

  createPerson({ photo, ...restData }) {
    const data = new FormData();

    data.append("photo", dataURItoBlob(photo));

    Object.keys(restData).forEach(key => {
      data.append(key, restData[key]);
    });

    const headers = headersAddBearerToken(this.token);

    return post(`${this.endpoint}/persons/`, data, headers);
  }

  deletePerson(id) {
    const headers = headersAddBearerToken(this.token);
    return deletes(`${this.endpoint}/persons/${id}/`, null, headers);
  }
}
