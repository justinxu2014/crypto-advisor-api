const websockets = require("../websockets");
const { io } = require(".");

let autoDisconnectID = null;

// Set up stream auto disconnect.
const stopAutoDisconnect = () => {
  if (autoDisconnectID) {
    clearInterval(autoDisconnectID);
    autoDisconnectID = null;

    console.log("Auto-disconnect off");
  }
};

const disconnectStreamsCheck = () => {
  if (io.engine.clientsCount == 0 && !websockets.areStreamsClosed) {
    websockets.disconnectStreams();
    stopAutoDisconnect();
    websockets.areStreamsClosed = true;

    console.log("Stream disconnected");
  }
};

// checks connection count every minute.
const initAutoDisconnect = () => {
  if (!autoDisconnectID) {
    console.log("Auto-disconnect on");
    autoDisconnectID = setInterval(disconnectStreamsCheck, 10000);
  }
};

module.exports = { initAutoDisconnect };
