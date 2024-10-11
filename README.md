# Real-Time Stock Tracking Web App

## Overview

A real-time stock tracking application that allows users to enter stock symbols, view current stock data, and get predictions on buying or selling based on historical data.
## Features
- Real-time stock data updates using WebSockets (Socket.IO)  
- Dynamic stock symbol search and data fetching  
- Visual representation of stock prices and buy/sell signals using Chart.js  
- Error handling for invalid symbols or API limits  
- Backend API powered by Express.js and MongoDB  
- Prediction algorithm for stock buy/sell signals based on moving averages

## Technologies Used

### Frontend:

- React.js  
- React-Router for navigation  
- Chart.js for stock data visualization
- react-chart-js-2, wrapper for Chart.js
- Socket.io-client for connecting to WebSocket server

### Backend:

- Node.js & Express.js  
- Socket.io for real-time WebSocket communication
- MongoDB with Mongoose library
- Polygon API for stock data

  ## Supported Stock Symbols

- **AAPL** (Apple Inc.)
- **IBM** (International Business Machines Corporation)
- **GOOGL** (Alphabet Inc.)
- **MSFT** (Microsoft Corporation)
- **AMZN** (Amazon.com Inc.)
- **TSLA** (Tesla, Inc.)
- **NFLX** (Netflix, Inc.)
- **FB** (Meta Platforms, Inc.)
- **NVDA** (NVIDIA Corporation)
- **BABA** (Alibaba Group Holding Ltd)
- **DIS** (The Walt Disney Company)
- **AMD** (Advanced Micro Devices, Inc.)
- **ORCL** (Oracle Corporation)
- **INTC** (Intel Corporation)
