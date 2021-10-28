const WebSocket = require("ws");
const { emitBinance } = require("../server/socketEmits");

let binanceStream = null;

const createBinanceSocket = () => {
  binanceStream = new WebSocket(
    "wss://stream.binance.com:9443/stream?streams=btcbusd@bookTicker/ethbusd@bookTicker"
  );

  console.log("start binance stream");
};

const initBinanceSocketHandlers = () => {
  // Websocket event handlers
  binanceStream.on("open", () => {
    console.log("Binance Socket Connected");

    // Check subscriptions.
    binanceStream.send(
      JSON.stringify({
        method: "LIST_SUBSCRIPTIONS",
        id: 1,
      })
    );
  });
  binanceStream.on("close", () => {
    console.log("Binance socket disconnected");
  });

  let BinanceBTCBuyPrice = 0;
  let BinanceBTCSellPrice = 0;
  let BinanceETHBuyPrice = 0;
  let BinanceETHSellPrice = 0;
  /*
  "u": order book updateId
  "s": symbol
  "b": best bid price
  "B": best bid qty
  "a": best ask price
  "A": best ask qty
*/
  binanceStream.on("message", (message) => {
    const data = JSON.parse(message.toString()).data;
    const symbol = data?.s;
    const buyPrice = parseFloat(data?.b);
    const sellPrice = parseFloat(data?.a);
    let change = false;

    if (symbol == "ETHUSD") {
      if (BinanceETHBuyPrice != buyPrice) {
        BinanceETHBuyPrice = buyPrice;
        change = true;
      }
      if (BinanceETHSellPrice != sellPrice) {
        BinanceETHSellPrice = sellPrice;
        change = true;
      }
    } else {
      if (BinanceBTCBuyPrice != buyPrice) {
        BinanceBTCBuyPrice = buyPrice;
        change = true;
      }
      if (BinanceBTCSellPrice != sellPrice) {
        BinanceBTCSellPrice = sellPrice;
        change = true;
      }
    }
    if (change) {
      emitBinance({ symbol, buyPrice, sellPrice });
      console.log(
        `UPDATE BINANCE ${symbol}: Buy: ${buyPrice} Sell: ${sellPrice}`
      );
    }
  });
};

const initBinanceStream = () => {
  createBinanceSocket();
  initBinanceSocketHandlers();
};

const disconnectBinanceStream = () => {
  if (binanceStream) {
    binanceStream.close();
  }
};

module.exports = {
  initBinanceStream,
  disconnectBinanceStream,
};
