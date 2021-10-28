const WebSocket = require("ws");
const { emitCoinbase } = require("../server/socketEmits");

let coinbaseStream = null;

const createCoinbaseSocket = () => {
  coinbaseStream = new WebSocket("wss://ws-feed.exchange.coinbase.com");
};

const initCoinbaseSocketHandlers = () => {
  // Websocket event handlers
  coinbaseStream.on("open", () => {
    console.log("Coinbase Socket Connected");

    const subscribeParams = {
      type: "subscribe",
      product_ids: ["BTC-USD", "ETH-USD"],
      channels: ["ticker"],
    };
    coinbaseStream.send(JSON.stringify(subscribeParams));
  });

  coinbaseStream.on("close", () => {
    console.log("Coinbase socket disconnected");
  });

  coinbaseStream.on("ping", () => {
    coinbaseStream.send();
  });

  let coinbaseETHBuyPrice = 0;
  let coinbaseETHSellPrice = 0;
  let coinbaseBTCBuyPrice = 0;
  let coinbaseBTCSellPrice = 0;

  coinbaseStream.on("message", (message) => {
    const data = JSON.parse(message.toString());
    const symbol = data.product_id;
    const buyPrice = parseFloat(data?.best_bid);
    const sellPrice = parseFloat(data?.best_ask);
    let change = false;

    if (symbol == "ETH-USD") {
      if (coinbaseETHBuyPrice != buyPrice) {
        coinbaseETHBuyPrice = buyPrice;
        change = true;
      }
      if (coinbaseETHSellPrice != sellPrice) {
        coinbaseETHSellPrice = sellPrice;
        change = true;
      }
    } else {
      if (coinbaseBTCBuyPrice != buyPrice) {
        coinbaseBTCBuyPrice = coinbaseBTCBuyPrice;
        change = true;
      }
      if (coinbaseBTCSellPrice != sellPrice) {
        coinbaseBTCBuyPrice = sellPrice;
        change = true;
      }
    }
    if (change) {
      emitCoinbase({ symbol, buyPrice, sellPrice });
      console.log(
        `UPDATE COINBASE ${data.product_id}: Buy: ${buyPrice}  Sell: ${sellPrice} `
      );
    }
  });
};

const initCoinbaseStream = () => {
  createCoinbaseSocket();
  initCoinbaseSocketHandlers();
};

const disconnectCoinbaseStream = () => {
  if (coinbaseStream) {
    coinbaseStream.close();
  }
};
module.exports = { initCoinbaseStream, disconnectCoinbaseStream };
