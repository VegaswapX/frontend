import * as React from "react";
import { widget } from "../../charting_library/charting_library";
import Datafeed from "./datafeed.js";
import "./index.css";

//
function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// add props here
export class TVChartContainer extends React.PureComponent {
  static defaultProps = {
    // symbol: "VGA", // Default
    interval: "15",
    containerId: "tv_chart_container",
    datafeedUrl: "https://demo_feed.tradingview.com",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  tvWidget = null;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(`this.props.symbol`, this.props.symbol);

    const widgetOptions = {
      symbol: this.props.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: Datafeed,
      interval: this.props.interval,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,

      theme: "dark",
      allow_symbol_change: false,
      hide_legend: true,
      // debug: true,

      locale: getLanguageFromURL() || "en",
      disabled_features: [
        "use_localstorage_for_settings",
        "left_toolbar",
        "header_compare",
        "header_undo_redo",
        "header_saveload",
      ],
      enabled_features: [],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          }));

        button.innerHTML = "Check API";
      });

      tvWidget
        .chart()
        .onSymbolChanged()
        .subscribe(null, function(symbolData) {
          console.log("Symbol change ");
          console.log(`symbolData`, symbolData);
          // thisComponent.getPattern();
        });
    });
  }

  componentDidUpdate(prevProps) {
    console.log(`this.props.symbol`, this.props.symbol);

    this.tvWidget.setSymbol(this.props.symbol, this.props.interval, () => {
      console.log(`changed to ${this.props.symbol}`);
    });
  }

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    return (
      <div
        id={this.props.containerId}
        className={"TVChartContainer"}
      />
    );
  }
}
