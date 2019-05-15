import Api from "../../../../base/api";

import { addFileToFormData, removeEmpty } from "../../../../utils";

export default class Utilities extends Api {
  comparePhotos = ({ photo1, photo2, conf } = {}) => {
    const fieldsData = { conf };
    const data = new FormData();

    addFileToFormData(data, photo1, "photo1");
    addFileToFormData(data, photo2, "photo2");

    Object.keys(fieldsData).forEach(key => {
      data.append(key, fieldsData[key]);
    });

    return this.httpClient.post("utility/compare/", data);
  };

  // TODO: написать тест
  comparePersonPhotoWithDocumentPhoto = ({
    photo,
    facesize,
    conf,
    liveness,
  } = {}) => {
    const fieldsData = { facesize, conf, liveness };
    const data = new FormData();

    addFileToFormData(data, photo, "photo");

    Object.keys(removeEmpty(fieldsData)).forEach(key => {
      data.append(key, fieldsData[key]);
    });

    return this.httpClient.post("faceid/compare/", data);
  };

  // TODO: написать тест
  verifyPersonPhotoWithDocumentPhoto = ({
    photo1,
    photo2,
    photo1_facesize,
    photo2_facesize,
    id_type,
    conf,
    liveness_photo1,
  } = {}) => {
    const fieldsData = {
      photo1_facesize,
      photo2_facesize,
      id_type,
      conf,
      liveness_photo1,
    };
    const data = new FormData();

    addFileToFormData(data, photo1, "photo1");
    addFileToFormData(data, photo2, "photo2");

    Object.keys(removeEmpty(fieldsData)).forEach(key => {
      data.append(key, fieldsData[key]);
    });

    return this.httpClient.post("faceid/verification/", data);
  };

  findOutCustomer = ({ source, offset } = {}) => {
    return this.httpClient.get("utility/customer/", { source, offset });
  };
}
