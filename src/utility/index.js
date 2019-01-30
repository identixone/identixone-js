import { post, headersAddBearerToken } from "../request";
import { dataURItoBlob } from "../utils/helpers";
import Api from "../Api";

export default class Utility extends Api {
  comparePhotos({ photo1, photo2, ...restData }) {
    const data = new FormData();

    data.append("photo1", dataURItoBlob(photo1), "photo1.png");
    data.append("photo2", dataURItoBlob(photo2), "photo2.png");

    Object.keys(restData).forEach(key => {
      data.append(key, restData[key]);
    });

    const headers = headersAddBearerToken(this.token);

    return post(`${this.endpoint}/utility/compare/`, data, headers);
  }
}
