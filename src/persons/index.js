import Api from "../Api";

import { dataURItoBlob } from "../utils/helpers";

export default class Persons extends Api {
  searchPersonByImage({ photo, ...restData }) {
    const data = new FormData();

    data.append("photo", dataURItoBlob(photo));

    Object.keys(restData).forEach(key => {
      data.append(key, restData[key]);
    });

    return this.httpClient.post("persons/search/", data);
  }

  createPerson({ photo, ...restData }) {
    const data = new FormData();

    data.append("photo", dataURItoBlob(photo));

    Object.keys(restData).forEach(key => {
      data.append(key, restData[key]);
    });

    return this.httpClient.post("persons/", data);
  }

  deletePerson(id) {
    return this.httpClient.delete(`persons/${id}/`);
  }
}
