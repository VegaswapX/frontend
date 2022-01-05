import { createChart } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
import { getOHLCData } from "./bitquery";

// TODO base and quote token from output
export function ChartWrapper({ token0, token1 }) {
  const chartDiv = useRef();
  const [chart, setChart] = useState(null);

  useEffect(async () => {
    // Adjust this width and height for mobile
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
