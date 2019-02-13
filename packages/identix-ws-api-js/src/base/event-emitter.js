class EventEmitter {
  constructor() {
    this._events = {};
  }

  _getEventCurrentListeners(event) {
    return this._events[event] || [];
  }

  on(event, listener) {
    const currentListeners = this._getEventCurrentListeners(event);

    this._events[event] = currentListeners.concat(listener);

    return () => {
      this.unsubscribe(event, listener);
    };
  }

  unsubscribe(event, listener) {
    const currentListeners = this._getEventCurrentListeners(event);

    if (currentListeners.includes(listener)) {
      this._events[event] = currentListeners.filter(l => l !== listener);
    }
  }

  emit(event, data) {
    const currentListeners = this._getEventCurrentListeners(event);

    if (currentListeners.length) {
      currentListeners.forEach(l => l(data));
    }
  }
}

module.exports = {
  EventEmitter,
};
