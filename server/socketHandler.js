const { io } = require(".");
const websockets = require("../websockets");
const { initAutoDisconnect } = require("./autoDisconnect");

const initSocketioHandlers = () => {
  io.on("connection", (socket) => {
    const id = socket.id;
    console.log("Connected: ", id);
    console.log("Total Connections: ", io.engine.clientsCount);

    if (websockets.areStreamsClosed) {
      websockets.initializeStreams();
      initAutoDisconnect();
      console.log("Stream Started");
      websockets.areStreamsClosed = false;
    }

    socket.on("disconnect", () => {
      console.log("Disconnected: ", id);
      console.log("Total Connections: ", io.engine.clientsCount);
    });
  });
};

module.exports = {
  initSocketioHandlers,
  initAutoDisconnect,
};
