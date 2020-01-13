import { Api } from "../../../../base/api";

import { addFileToFormData, addDataToFormData } from "../../../../utils";
import {
  UtilitiesInterface,
  ComparePhotosParamsInterface,
  ComparePhotosResponseInterface,
  ComparePersonPhotoWithDocumentPhotoParamsInterface,
  VerifyPersonPhotoWithDocumentPhotoParamsInterface,
  VerifyPersonPhotoWithDocumentPhotoResponseInterface,
  FindOutCustomerParamsInterface,
  FindOutCustomerResponseInterface,
  GetApiVersionResponseInterface,
  CheckAsmParamsInterface,
  CheckAsmResponseInterface,
} from "../../../api-facade/v1/utilities";

class Utilities extends Api implements UtilitiesInterface {
  comparePhotos({
    photo1,
    photo2,
    conf,
  }: ComparePhotosParamsInterface): Promise<ComparePhotosResponseInterface> {
    const fieldsData = { conf };
    const data = new FormData();

    addFileToFormData(data, photo1, "photo1");
    addFileToFormData(data, photo2, "photo2");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post("utility/compare/", data);
  }

  comparePersonPhotoWithDocumentPhoto({
    photo,
    facesize,
    conf,
  }: ComparePersonPhotoWithDocumentPhotoParamsInterface): Promise<
    ComparePhotosResponseInterface
  > {
    const fieldsData = { facesize, conf };
    const data = new FormData();

    addFileToFormData(data, photo, "photo");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post("faceid/compare/", data);
  }

  verifyPersonPhotoWithDocumentPhoto({
    photo_face,
    photo_face_facesize,
    photo_id,
    photo_id_facesize,
    id_code,
    conf,
  }: VerifyPersonPhotoWithDocumentPhotoParamsInterface): Promise<
    VerifyPersonPhotoWithDocumentPhotoResponseInterface
  > {
    const fieldsData = {
      photo_face_facesize,
      photo_id_facesize,
      id_code,
      conf,
    };
    const data = new FormData();

    addFileToFormData(data, photo_face, "photo_face");
    addFileToFormData(data, photo_id, "photo_id");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post("faceid/verification/", data);
  }

  findOutCustomer({
    source,
    offset,
  }: FindOutCustomerParamsInterface): Promise<
    FindOutCustomerResponseInterface
  > {
    return this.httpClient.get("utility/customer/", { source, offset });
  }

  // Added
  checkAsm({
    photo,
  }: CheckAsmParamsInterface): Promise<CheckAsmResponseInterface> {
    return this.httpClient.post("utility/compare/", { photo });
  }

  // Added
  getSupportedIdTypes(): Promise<{}> {
    return this.httpClient.get("faceid/id-codes/");
  }

  getApiVersion(): Promise<GetApiVersionResponseInterface> {
    return this.httpClient.get("version/");
  }
}

export { Utilities };
