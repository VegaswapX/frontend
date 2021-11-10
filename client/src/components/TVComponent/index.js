import {createChart} from "lightweight-charts";
import React, {useEffect, useRef, useState} from "react";
import {exampleData} from "./data";
import { ApolloClient, gql,
  InMemoryCache
} from "@apollo/client";
const BITQUERY_ENDPOINT = `https://graphql.bitquery.io`;
const graphqlCache = new InMemoryCache();

const exampleQuery = gql`
{
  ethereum(network: bsc) {
    dexTrades(options: {limit: 100, asc: "timeInterval.minute"}, date: {since: "2020-11-01"}, exchangeName: {in: ["Pancake", "Pancake v2"]}, baseCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}, quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}) {
      timeInterval {
        minute(count: 5)
      }
      baseCurrency {
        symbol
        address
      }
      baseAmount
      quoteCurrency {
        symbol
        address
      }
      quoteAmount
      trades: count
      quotePrice
      maximum_price: quotePrice(calculate: maximum)
      minimum_price: quotePrice(calculate: minimum)
      open_price: minimum(of: block, get: quote_price)
      close_price: maximum(of: block, get: quote_price)
    }
  }
}
`

const client = new ApolloClient({
  cache: graphqlCache,
  uri: BITQUERY_ENDPOINT,
});

function transformToChartData(graphqlData) {
  const res = graphqlData.map(x => {
    return {
      time: x.timeInterval.minute, // minute chart, TODO: Make it work with other kind of chart
      open: parseFloat(x.open_price),
      high: x.maximum_price,
      low: x.minimum_price,
      close: parseFloat(x.close_price),
    }
  })
  return res;
}

// TODO: Measure response time
try {
  client.query({
    query: exampleQuery,
  }).then(res => {
    console.log("graphql res", res);
    const {dexTrades} = res?.data?.ethereum;
    const chartData = transformToChartData(dexTrades);
    console.log(`chartData`, chartData);
  })
} catch(e) {
  console.log(`e`, e);
}

export function ChartWrapper() {
  const chartDiv = useRef();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const chart_ = createChart(chartDiv.current, {
      width: 800,
      height: 400,

      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      watermark: {
        visible: true,
        fontSize: 34,
        color: "rgba(0, 0, 0, 0.25)",
      },
    });

    const priceData = exampleData;

    // candle chart
    const lineSeries = chart_.addCandlestickSeries();
    lineSeries.setData(priceData);
    setChart(chart_);
  }, []);

  return (
    <div ref={chartDiv} style={{ position: "relative" }}>
    </div>
  );
}