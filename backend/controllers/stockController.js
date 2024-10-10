const Stock = require('../models/Stock.js');
const axios = require('axios');
require('dotenv').config();
const { calculateBuySellSignals } = require('../utils/predictionAlgorithm'); // Prediction logic

const API_KEY = process.env.POLYGON_API_KEY; // Replace with your Polygon API key

exports.getStockData = async (symbol, io) => { // Accept symbol and io
  console.log('symbol:', symbol); // Log the symbol for debugging

  console.log('baby ',process.env.POLYGON_API_KEY)

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 days ago

  try {
    const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${thirtyDaysAgo}/${today}?apiKey=${API_KEY}`);
    console.log('response ',response.data.results);
    
    if (response.data.status === 'ERROR' || response.data.results === undefined) {
      return io.emit('stockUpdate', { error: 'Invalid stock symbol or API limit reached' }); // Emit error message
    }

    const stockData = response.data.results.map(item => ({
      time: new Date(item.t).toISOString(), // Adjust time format as needed
      open: item.o,
      high: item.h,
      low: item.l,
      close: item.c,
      volume: item.v,
    }));

    console.log(stockData);
    const predictions = calculateBuySellSignals(stockData);

    const stock = await Stock.findOneAndUpdate({ symbol }, { data: stockData, predictions }, { upsert: true, new: true });
    io.emit('stockUpdate', { data: stockData, predictions }); // Emit updated stock data
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    io.emit('stockUpdate', { error: 'Error fetching stock data' }); // Emit error message
  }
};


//alpha vintage api

// const Stock = require('../models/Stock.js');
// const axios = require('axios');
// const { calculateBuySellSignals } = require('../utils/predictionAlgorithm');  // Prediction logic

// const API_KEY = '9XP7U54EHJW3ZEGJ';

// exports.getStockData = async (req, res) => {

//   const { symbol } = req.params;  
//   console.log('symbol ',symbol) //symbol

//   try {
//     const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`);
    
//     console.log('API Response:', response.data);


//     if (response.data['Error Message']) {
//       console.error('Error from API:', response.data['Error Message']);
//       return res.status(400).json({ error: 'Invalid stock symbol or API limit reached' });
//   }

//     const stockData = response.data['Time Series (5min)'];

//     // Prepare data for prediction calculation
//     const data = Object.entries(stockData).map(([time, value]) => ({
//       time,
//       open: parseFloat(value['1. open']),
//       high: parseFloat(value['2. high']),
//       low: parseFloat(value['3. low']),
//       close: parseFloat(value['4. close']),
//       volume: parseInt(value['5. volume']),
//     }));

//     // Call the prediction algorithm with the stock data
//     const predictions = calculateBuySellSignals(data);

//     // Update or create the stock document in the database
//     const stock = await Stock.findOneAndUpdate({ symbol }, { data, predictions }, { upsert: true, new: true });
//     res.json(stock);
//   } catch (error) {
//     console.error('Error fetching stock data', error);
//     res.status(500).json({ error: 'Error fetching stock data' });
//   }
// };
