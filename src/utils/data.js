export function removeEmpty(obj) {
  return Object.keys(obj)
    .filter(key => obj[key] !== undefined)
    .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {});
}
