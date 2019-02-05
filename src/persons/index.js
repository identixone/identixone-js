import Api from "../Api";

import { addFileToFormData } from "../utils";

export default class Persons extends Api {
  searchPersonByImage({ photo, ...restData }) {
    const data = new FormData();

    addFileToFormData(data, photo, "photo");

    Object.keys(restData).forEach(key => {
      data.append(key, restData[key]);
    });

    return this.httpClient.post("persons/search/", data);
  }

  createPerson({ photo, ...restData }) {
    const data = new FormData();

    addFileToFormData(data, photo, "photo");

    Object.keys(restData).forEach(key => {
      data.append(key, restData[key]);
    });

    return this.httpClient.post("persons/", data);
  }

  deletePerson(id) {
    return this.httpClient.delete(`persons/${id}/`);
  }

  reinitializePersonByRecord({ recordId, faceSize }) {
    return this.httpClient.post("persons/reinit/", { id: recordId, faceSize });
  }

  reinitializePersonByImage({ personId, photo, ...restData }) {
    const data = new FormData();

    addFileToFormData(data, photo, "photo");

    Object.keys(restData).forEach(key => {
      data.append(key, restData[key]);
    });

    return this.httpClient.post(`persons/reinit/${personId}`, data);
  }
}
