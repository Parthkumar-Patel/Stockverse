// Author: Sai Rahul Kodumuru (B00875628)

import React from 'react';
import Plot from 'react-plotly.js';

function InstrumentPlot(props) {
  const dailyData = props['dailyData']['Time Series (Daily)'];
  const open = [];
  const high = [];
  const low = [];
  const close = [];
  const volume = [];
  const dates = dailyData ? Object.keys(dailyData) : [];

  function generateRows() {
    if (dates) {
      dates.forEach((date) => {
        open.push(parseFloat(dailyData[date]['1. open']));
        high.push(parseFloat(dailyData[date]['2. high']));
        low.push(parseFloat(dailyData[date]['3. low']));
        close.push(parseFloat(dailyData[date]['4. close']));
        volume.push(parseFloat(dailyData[date]['5. volume']));
      });
    }
  }

  generateRows();

  return (
    <Plot
      data={[
        {
          x: dates,

          open: open || [],

          high: close || [],

          close: close || [],

          low: low || [],

          type: 'candlestick',

          increasing: { line: { color: 'black' } },

          decreasing: { line: { color: 'red' } },

          xaxis: 'x',

          yaxis: 'y',

          marker: { color: '#9E9E9E' },
        },
      ]}
      layout={{
        width: 1024,
        height: 474,
        title: 'Daily Prices (open, high, low, close)',
        dragmode: 'zoom',
        showlegend: false,
        xaxis: {
          rangeslider: {
            visible: false,
          },
        },
      }}
    />
  );
}

export default InstrumentPlot;
