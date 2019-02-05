export function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);
  // separate out the mime component
  var mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];
  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

export function isBinaryFile(file) {
  return Boolean(file.type);
}

export function getFileExtensionFromBase64String(base64) {
  return base64.substring("data:image/".length, base64.indexOf(";base64"));
}

export function getFileExtension(file) {
  if (isBinaryFile(file)) {
    const { name } = file;

    return name.substring(name.lastIndexOf(".") + 1, name.length) || name;
  } else {
    return getFileExtensionFromBase64String(file);
  }
}

export function addFileToFormData(formData, file, fieldName, fileName) {
  const formFieldName = fileName || `${fieldName}.${getFileExtension(file)}`;

  if (isBinaryFile(file)) {
    formData.append(fieldName, file, formFieldName);
  } else {
    formData.append(fieldName, dataURItoBlob(file), formFieldName);
  }

  return formData;
}
