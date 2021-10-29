const { io } = require(".");

const emitBinance = (data) => {
  io.emit("update:binance", data);
};
const emitCoinbase = (data) => {
  io.emit("update:coinbase", data);
};

module.exports = { emitBinance, emitCoinbase };
