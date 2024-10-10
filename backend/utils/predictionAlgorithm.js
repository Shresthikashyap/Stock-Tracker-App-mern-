
exports.calculateBuySellSignals = (data) => {
  const predictions = [];
  for (let i = 5; i < data.length; i++) {
    const movingAverage = data.slice(i - 5, i).reduce((acc, cur) => acc + parseFloat(cur.close), 0) / 5;
    const currentPrice = parseFloat(data[i].close);

    if (currentPrice > movingAverage) {
      predictions.push({ time: data[i].time, signal: 'BUY' });
    } else {
      predictions.push({ time: data[i].time, signal: 'SELL' });
    }
  }
  return predictions;
};