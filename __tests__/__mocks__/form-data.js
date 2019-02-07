export function FormData() {
  this._data = {};
}

FormData.prototype.append = function(key, value, filename) {
  if (filename) {
    this._data[key] = { value, filename };
  } else {
    this._data[key] = value;
  }
};

FormData.prototype.clear = function() {
  this._data = {};
};
