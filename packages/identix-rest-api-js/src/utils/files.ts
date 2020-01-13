import { removeEmpty } from "./index";

// convert base64/URLEncoded data component to raw binary data held in a string
function dataURItoBlob(dataURI: string): Blob {
  let byteString;

  if (dataURI.split(",")[0].indexOf("base64") >= 0) {
    byteString = atob(dataURI.split(",")[1]);
  } else {
    byteString = unescape(dataURI.split(",")[1]);
  }

  // separate out the mime component
  const mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];
  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

function getFileExtensionFromBase64String(base64: string): string {
  return base64.substring("data:image/".length, base64.indexOf(";base64"));
}

export function addFileToFormData(
  formData: FormData,
  file: File | string,
  fieldName: string,
  fileName?: string
): FormData {
  if (!file) return formData;

  if (typeof file === "string") {
    const formFieldName =
      fileName || `${fieldName}.${getFileExtensionFromBase64String(file)}`;

    formData.append(fieldName, dataURItoBlob(file), formFieldName);
  } else {
    const formFieldName = fileName || file.name;

    formData.append(fieldName, file, formFieldName);
  }

  return formData;
}

interface FieldsData {
  [key: string]: any;
}

export function addDataToFormData(
  formData: FormData,
  fieldsData: FieldsData
): FormData {
  if (!formData) return formData;

  Object.keys(removeEmpty(fieldsData)).forEach(key => {
    const value = fieldsData[key];

    formData.append(key, value);
  });

  return formData;
}
