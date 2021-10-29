// Shared Event Emitter.

const { EventEmitter } = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("uncaughtException", (e) => {
  console.error(e);
});

module.exports = eventEmitter;
