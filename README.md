# Crypto Advisor API

An API that aggregates crypto market data

## Features

1. Receives real-time market data from Binance and Coinbase through websocket stream.
2. Real-time data is pushed to clients through socket.io connections.
3. Server disconnects from market data stream automatically when there are no client connections.
4. Server reconnects to market data stream automatically when client connnections resume.

## Local Setup Guide

1. Install dependencies using `yarn`CLI command.
2. Start the app using the following scripts.

   ### `yarn start`

   Runs the server.\
   Server URL defaults to http://localhost:3000\
   Set .env variable PORT to customize port number.

   ### `yarn dev`

   Same as `yarn start` but with auto-restart enabled for local development.

## Repository Breakdown

- `/`

  - `app.js`\
    Starting point of application.

- `/server`

  - `index.js`\
    Express + Socket.io + middlewares configs are initialized here.
  - `socketHandler.js`\
    Socket.io event handlers are initialized here.
  - `socketEmits.js`\
    Socket.io emit functions are initialized here.
  - `autoDisconnect.js`\
    Functions for autoDisconnect feature are initialized here.

- `/websockets`

  - `index.js`\
    Socket.io emit functions are initialized here.
  - `binance.js`\
    Socket.io emit functions are initialized here.
  - `coinbase.js`\
    Socket.io emit functions are initialized here.

- `/routes`
  - `index.js`\
    Default server endpoint. Get requests return title of application.
