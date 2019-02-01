import Api from "../Api";

import { dataURItoBlob } from "../utils/helpers";

export default class Utility extends Api {
  comparePhotos({ photo1, photo2, ...restData }) {
    const data = new FormData();

    data.append("photo1", dataURItoBlob(photo1), "photo1.png");
    data.append("photo2", dataURItoBlob(photo2), "photo2.png");

    Object.keys(restData).forEach(key => {
      data.append(key, restData[key]);
    });

    return this.httpClient.post(`utility/compare/`, data);
  }
}
