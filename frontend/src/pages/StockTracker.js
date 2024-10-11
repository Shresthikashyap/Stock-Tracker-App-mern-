import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import StockChart from '../components/StockChart';

// Connecting to WebSocket server
const socket = io(process.env.NODE_ENV === 'production' 
  ? process.env.PRODUCTION_URL
  : 'http://localhost:5000'
);

const StockTracker = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);

  const fetchStockData = useCallback(() => {
    if (symbol) {
      socket.emit('getStockData', symbol);
    }
  }, [symbol]);

  useEffect(() => {
    if (symbol) {
      socket.on('stockUpdate', (data) => {
        if (data.error) {
          setError(data.error); // Set error message
          setStockData([]); // Clear stock data
          setPredictions([]); // Clear predictions
        } else {
          setError(null); // Clear previous errors
          setStockData(data.data);
          setPredictions(data.predictions);
        }
      });

      // Cleanup socket listener on unmount
      return () => {
        socket.off('stockUpdate');
      };
    }
  }, [symbol]);

  return (
    <div>
      <h1>Stock Tracker</h1>
      <div>
        <input
          type="text"
          onChange={(e) => setSymbol(e.target.value.toUpperCase())} // Instant converting the symbol to upper case
          placeholder="Enter Stock Symbol"
        />
        <button
          className="btn btn-success"
          onClick={() => fetchStockData()}
        >
          Get Stock Data
        </button>
      </div>

      {error && <div>{error}</div>} 

      <StockChart stockData={stockData} predictions={predictions} /> {/* Rendering the chart */}
    </div>
  );
};

export default StockTracker;
