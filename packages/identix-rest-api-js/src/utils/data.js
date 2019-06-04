export function removeEmpty(obj) {
  if (typeof obj !== "object" || obj === null) return obj;

  return Object.keys(obj)
    .filter(key => obj[key] !== undefined)
    .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {});
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
