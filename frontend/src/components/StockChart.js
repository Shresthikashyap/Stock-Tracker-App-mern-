import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment'; // Import moment.js for date formatting

const StockChart = ({ stockData, predictions }) => {
  // Default empty dataset
  const defaultData = {
    labels: ['No data available'], // Placeholder label when no data
    datasets: [
      {
        label: 'Close Price',
        borderColor: 'blue',
      },
      {
        label: 'Buy Signals',
        borderColor: 'green',
      },
      {
        label: 'Sell Signals',
        borderColor: 'red',
      },
    ],
  };

  // Using stockData only if it's available, otherwise defaultData will be used
  const chartData = stockData.length > 0
    ? {
      labels: stockData.map(item => moment(item.time).format('MMM DD')), // Format time to 'MMM DD'
      datasets: [
        {
          label: 'Close Price',
          data: stockData.map(item => item.close),
          borderColor: 'blue',
          fill: false,
        },
        {
          label: 'Buy Signals',
          data: predictions.map((item, index) => (item.signal === 'BUY' ? stockData[index]?.close : null)),
          borderColor: 'green',
          fill: false,
          pointStyle: 'circle',
          pointRadius: predictions.map(item => (item.signal === 'BUY' ? 5 : 0)),
        },
        {
          label: 'Sell Signals',
          data: predictions.map((item, index) => (item.signal === 'SELL' ? stockData[index]?.close : null)),
          borderColor: 'red',
          fill: false,
          pointStyle: 'circle',
          pointRadius: predictions.map(item => (item.signal === 'SELL' ? 5 : 0)),
        },
      ],
    }
    : defaultData; 

  const options = {
    plugins: {
      legend: {
        labels: {
          color: '#ffffff', 
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time Duration (30 days)', 
          color: '#ffffff', 
          font: {
            size: 16,
            family: "'Roboto', sans-serif",
          },
        },
        ticks: {
          color: '#ffffff', 
        },
      },
      y: {
        title: {
          display: true,
          text: 'Stock Price (USD)', 
          color: '#ffffff', 
          font: {
            size: 16,
            family: "'Roboto', sans-serif",
          },
        },
        ticks: {
          color: '#ffffff', 
        },
      },
    },
  };

  return <Line data={chartData} options={options} width={600} height={210} />;
};

export default StockChart;
