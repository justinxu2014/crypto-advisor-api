const { startServer } = require("./server/server");

const start = () => {
  startServer();
  require("./server/socketHandller");
};

start();
