export function removeEmpty(obj) {
  return Object.keys(obj)
    .filter(key => obj[key] !== undefined)
    .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {});
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function isExist(prop) {
  return typeof prop !== "undefined"
}
