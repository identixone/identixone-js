const { isNode } = require("browser-or-node");

const NodeEventEmitter = require("events");
const ee = require("event-emitter");

class EventEmitter {}
ee(EventEmitter.prototype);

module.exports = {
  EventEmitter: isNode ? NodeEventEmitter : EventEmitter,
};
