const { io } = require("./server");
const { initializeStreams, disconnectStreams } = require("../websockets");

let closed = true;
io.on("connection", (socket) => {
  console.log(socket.id);

  if (closed) {
    console.log("closed");
    initializeStreams();
    closed = false;
  }
  socket.on("disconnect", () => {
    console.log(io.engine.clientsCount);

    if (io.engine.clientsCount == 0) {
      disconnectStreams();
      closed = true;
      console.log("Streams Disconnected");
    }
  });
});
