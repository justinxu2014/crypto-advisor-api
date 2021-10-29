const binance = require("./binance");
const coinbase = require("./coinbase");

let areStreamsClosed = true;

const initializeStreams = () => {
  binance.initBinanceStream();
  coinbase.initCoinbaseStream();
};

const disconnectStreams = () => {
  binance.disconnectBinanceStream();
  coinbase.disconnectCoinbaseStream();
};

module.exports = { areStreamsClosed, initializeStreams, disconnectStreams };
