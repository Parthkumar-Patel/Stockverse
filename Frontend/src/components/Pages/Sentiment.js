// Author: Sai Rahul Kodumuru (B00875628)

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { getConsumerSentiment } from '../../utils/apiCalls';

function Sentiment() {
  const [sentimentData, setSentimentData] = useState({});
  const layout = { width: 300, height: 300 };
  const info = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: sentimentData,
      title: { text: 'Consumer Sentiment' },
      type: 'indicator',
      mode: 'number+gauge+delta',
      delta: { reference: 100 },
      gauge: { axis: { range: [null, 100] } },
    },
  ];
  useEffect(() => {
    async function fetchData() {
      const { data } = await getConsumerSentiment();
      setSentimentData(data);
    }
    fetchData();
  }, []);
  return <Plot data={info} layout={layout} />;
}

export default Sentiment;
