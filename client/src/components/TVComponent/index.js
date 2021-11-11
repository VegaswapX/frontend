import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { createChart } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
import { exampleData, minutesData } from "./data";
const BITQUERY_ENDPOINT = `https://graphql.bitquery.io`;
const graphqlCache = new InMemoryCache();

// TODO: Get minute chart
// TODO: Get multiple query with WBNB/USDT so you can get USDT chart
const exampleQuery = gql `
query getOHLC($minuteInterval: Int, $baseCurrency: String, $quoteCurrency: String) {
    ethereum(network: bsc) {
      dexTrades(options: {
        limit: 100, 
        asc: "timeInterval.minute"}, 
        date: {since: "2020-11-01"}, 
        exchangeName: {in: ["Pancake", "Pancake v2"]}, 
        baseCurrency: {is: $baseCurrency}, quoteCurrency: {is: $quoteCurrency}) {
        timeInterval {
          minute(count: $minuteInterval)
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
`;

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
    };
  });
  return res;
}

// TODO: Measure response time
async function getOHLCData(minuteInterval = 1440, baseCurrency, quoteCurrency) {
  try {
    const t0 = performance.now();
    const res = await client.query({
      query: exampleQuery,
      variables: {
        "minuteInterval": minuteInterval,
        "baseCurrency": "0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d",
        "quoteCurrency": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      },
    });
    const t1 = performance.now();
    // DEBUG
    console.log(`[bitquery] responseTime`, t1 - t0);

    console.log("graphql res", res);
    const { dexTrades } = res?.data?.ethereum;
    const chartData = transformToChartData(dexTrades);
    return chartData;
    // console.log(`chartData`, chartData);
  } catch (e) {
    console.log(`e`, e);
  }
}

// TODO base and quote token from output
export function ChartWrapper({ token0, token1 }) {
  const chartDiv = useRef();
  const [chart, setChart] = useState(null);

  useEffect(async () => {
    const chart_ = createChart(chartDiv.current, {
      width: 800,
      height: 400,

      timeScale: {
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        borderColor: "#fff000",
        visible: true,
        autoScale: true,
        timeVisible: true,
        secondsVisible: false,
      },

      localization: {
        priceFormatter: price => {
          // TODO: Depends on the price returned, display how many fixed number
          // console.log(`price`, price);
          return price.toFixed(10);
        },
      },

      // priceScale: {
      //   autoScale: false,
      //   invertScale: false,
      //   alignLabels: false,
      //   borderVisible: false,
      //   scaleMargins: {
      //     top: 0.30,
      //     bottom: 0.25,
      //   },
      // },

      watermark: {
        visible: true,
        fontSize: 34,
        color: "rgba(0, 0, 0, 0.25)",
      },
    });

    // timeScale
    // const timeScale = chart_.timeScale().options();
    // console.log(`timeScale`, timeScale);
    const lineSeries = chart_.addCandlestickSeries();
    setChart(chart_);

    const priceData = await getOHLCData();
    console.log(`priceData`, priceData);
    lineSeries.setData(priceData);

    // update data
    const interval = setInterval(async () => {
      const priceData = await getOHLCData(); // prepare with cors data
      console.log(`update`, priceData);

      lineSeries.setData(priceData);
    }, 60 * 1000); // 1 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={chartDiv} style={{ position: "relative" }}>
    </div>
  );
}
