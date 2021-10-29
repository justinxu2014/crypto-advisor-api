const { startServer } = require("./server");
const { initSocketioHandlers } = require("./server/socketHandler");

const start = () => {
  startServer();
  initSocketioHandlers();
};

start();
