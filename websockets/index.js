const binance = require("./binance");
const coinbase = require("./coinbase");

const initializeStreams = () => {
  binance.initBinanceStream();
  coinbase.initCoinbaseStream();
};

const disconnectStreams = () => {
  binance.disconnectBinanceStream();
  coinbase.disconnectCoinbaseStream();
};

module.exports = { initializeStreams, disconnectStreams };
