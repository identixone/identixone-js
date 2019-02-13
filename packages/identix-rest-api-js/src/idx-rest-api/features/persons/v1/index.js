import Api from "../../../../base/api";

import { addFileToFormData } from "../../../../utils";

export default class Persons extends Api {
  searchPersonByImage({ photo, asm, liveness } = {}) {
    const fieldsData = { asm, liveness };
    const data = new FormData();

    addFileToFormData(data, photo, "photo");

    Object.keys(fieldsData).forEach(key => {
      data.append(key, fieldsData[key]);
    });

    return this.httpClient.post("persons/search/", data);
  }

  createPerson({
    photo,
    source,
    facesize,
    create_on_ha,
    create_on_junk,
    asm,
  } = {}) {
    const fieldsData = { source, facesize, create_on_ha, create_on_junk, asm };
    const data = new FormData();

    addFileToFormData(data, photo, "photo");

    Object.keys(fieldsData).forEach(key => {
      data.append(key, fieldsData[key]);
    });

    return this.httpClient.post("persons/", data);
  }

  deletePerson(id) {
    return this.httpClient.delete(`persons/${id}/`);
  }

  reinitializePersonByRecord({ recordId, facesize } = {}) {
    return this.httpClient.post("persons/reinit/", { id: recordId, facesize });
  }

  reinitializePersonByImage({ personId, photo, source, facesize, conf } = {}) {
    const fieldsData = { source, facesize, conf };
    const data = new FormData();

    addFileToFormData(data, photo, "photo");

    Object.keys(fieldsData).forEach(key => {
      data.append(key, fieldsData[key]);
    });

    return this.httpClient.post(`persons/reinit/${personId}`, data);
  }
}
