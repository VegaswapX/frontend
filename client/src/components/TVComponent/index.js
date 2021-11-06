import {createChart} from "lightweight-charts";
import React, {useEffect, useRef, useState} from "react";
import {exampleData} from "./data";

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