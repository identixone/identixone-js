import Api from "../Api";

import { addFileToFormData } from "../utils";

export default class Utilities extends Api {
  comparePhotos({ photo1, photo2, ...restData }) {
    const data = new FormData();

    addFileToFormData(data, photo1, "photo1");
    addFileToFormData(data, photo2, "photo2");

    Object.keys(restData).forEach(key => {
      data.append(key, restData[key]);
    });

    return this.httpClient.post("utility/compare/", data);
  }

  findOutCustomer({ source, offset }) {
    return this.httpClient.get("utility/customer/", { source, offset });
  }
}
