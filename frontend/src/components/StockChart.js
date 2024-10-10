import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const StockChart = ({ stockData, predictions }) => {
  // Default empty dataset
  const defaultData = {
    labels: ['No data available'], // Placeholder label when no data
    datasets: [
      {
        label: 'Close Price',
        data: [0], // Default zero value for the graph
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Buy Signals',
        data: [null],
        borderColor: 'green',
        fill: false,
        pointStyle: 'circle',
        pointRadius: [0],
      },
      {
        label: 'Sell Signals',
        data: [null],
        borderColor: 'red',
        fill: false,
        pointStyle: 'circle',
        pointRadius: [0],
      },
    ],
  };

  // Use stockData only if it's available, otherwise use defaultData
  const chartData = stockData.length > 0
    ? {
      labels: stockData.map(item => item.time), // Ensure there are multiple time points
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
    : defaultData; // Use default data if no stock data is available

    const options = {
      plugins: {
        legend: {
          labels: {
            color: '#ffffff', // White for the labels
            font: {
              size: 14,
              family: "'Roboto', sans-serif",
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#ffffff', // White for x-axis labels
          },
        },
        y: {
          ticks: {
            color: '#ffffff', // White for y-axis labels
          },
        },
      },
    };
  
    return <Line data={chartData} options={options} width={600} height={210} />;
};

export default StockChart;



// const StockChart = ({ stockData, predictions }) => {
//   const chartData = {
//     labels: stockData.map(item => item.time),
//     datasets: [
//       {
//         label: 'Close Price',
//         data: stockData.map(item => item.close),
//         borderColor: 'blue',
//         fill: false,
//       },
//       {
//         label: 'Buy Signals',
//         data: predictions.map((item, index) => (item.signal === 'BUY' ? stockData[index]?.close : null)),
//         borderColor: 'green',
//         fill: false,
//         pointStyle: 'circle',
//         pointRadius: predictions.map(item => (item.signal === 'BUY' ? 5 : 0)), // Display points for BUY signals
//       },
//       {
//         label: 'Sell Signals',
//         data: predictions.map((item, index) => (item.signal === 'SELL' ? stockData[index]?.close : null)),
//         borderColor: 'red',
//         fill: false,
//         pointStyle: 'circle',
//         pointRadius: predictions.map(item => (item.signal === 'SELL' ? 5 : 0)), // Display points for SELL signals
//       },
//     ],
//   };

//   return <Line data={chartData} />;
// };

// export default StockChart;
