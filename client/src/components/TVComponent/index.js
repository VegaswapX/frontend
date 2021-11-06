import { createChart } from "lightweight-charts";
import React from "react";

class ChartWrapper extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.chartDiv = React.createRef();
  }

  componentDidMount() {
    this.chart = createChart(this.chartDiv.current, {
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
  }

  render() {
    return (
      <div ref={this.chartDiv} style={{ position: "relative" }}>
      </div>
    );
  }
}

export default ChartWrapper;
