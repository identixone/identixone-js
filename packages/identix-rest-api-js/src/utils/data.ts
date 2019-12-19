export function removeEmpty(obj: { [key: string]: any }): any {
  if (typeof obj !== "object" || obj === null || obj instanceof Array) {
    return obj;
  }

  return Object.keys(obj)
    .filter(key => obj[key] !== undefined)
    .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {});
}

export function isEmpty(obj: {}): boolean {
  return Object.keys(obj).length === 0;
}
