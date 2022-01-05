// Make requests to CryptoCompare API
import { getOHLCData } from "./bitquery";

export async function makeApiRequest(path) {
  try {
    const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
    return response.json();
  } catch (error) {
    throw new Error(`CryptoCompare request error: ${error.status}`);
  }
}

// Generate a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
  const short = `${fromSymbol}/${toSymbol}`;
  return {
    short,
    full: `${exchange}:${short}`,
  };
}

export function parseFullSymbol(fullSymbol) {
  const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
  if (!match) {
    return null;
  }

  return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}

async function getAllSymbols() {
  const data = await makeApiRequest("data/v3/all/exchanges");
  console.log(` getAllSymbols data`, data.Data);
  let allSymbols = [];

  for (const exchange of configurationData.exchanges) {
    const pairs = data.Data[exchange.value].pairs;

    for (const leftPairPart of Object.keys(pairs)) {
      const symbols = pairs[leftPairPart].map(rightPairPart => {
        const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
        return {
          symbol: symbol.short,
          full_name: symbol.full,
          description: symbol.short,
          exchange: exchange.value,
          type: "crypto",
        };
      });
      allSymbols = [...allSymbols, ...symbols];
    }
  }
  return allSymbols;
}

const configurationData = {
  supported_resolutions: ["5m", "15m", "1D"],
  exchanges: [
    {
      value: "Binance",
      name: "Binance",
      desc: "Binance",
    },
  ],
  symbols_types: [
    {
      name: "crypto",

      // `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
      value: "crypto",
    },
    // ...
  ],
};

async function _getBars(from, to, parsedSymbol) {
  console.log(`[_getBars] parsedSymbol`, parsedSymbol);
  const urlParameters = {
    e: parsedSymbol.exchange,
    fsym: parsedSymbol.fromSymbol,
    tsym: parsedSymbol.toSymbol,
    toTs: to,
    limit: 2000,
  };
  const query = Object.keys(urlParameters)
    .map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
    .join("&");
  // get BSC data
  try {
    const data = await makeApiRequest(`data/histoday?${query}`);
    if (data.Response && data.Response === "Error" || data.Data.length === 0) {
      // "noData" should be set if there is no data in the requested period.
      return [];
    }
    let bars = [];
    data.Data.forEach(bar => {
      if (bar.time >= from && bar.time < to) {
        bars = [...bars, {
          time: bar.time * 1000,
          low: bar.low,
          high: bar.high,
          open: bar.open,
          close: bar.close,
        }];
      }
    });
    console.log(`[getBars]: returned ${bars.length} bar(s)`);
    console.log(`bars`, bars);
    return bars;
  } catch (error) {
    console.log("[getBars]: Get error", error);
    return null;
  }
}

let calledOnce = false;

export default {
  onReady: (callback) => {
    console.log("[onReady]: Method call");
    setTimeout(() => callback(configurationData));
  },

  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
  ) => {
    console.log("[resolveSymbol]: Method call", symbolName);
    const symbols = await getAllSymbols();
    console.log(`symbols`, symbols);
    const symbolItem = symbols.find(({ full_name }) => full_name === symbolName);
    if (!symbolItem) {
      console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
      onResolveErrorCallback("cannot resolve symbol");
      return;
    }
    const symbolInfo = {
      ticker: symbolItem.full_name,
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      session: "24x7",
      timezone: "Etc/UTC",
      exchange: symbolItem.exchange,
      minmov: 1,
      pricescale: 100,
      has_intraday: false,
      has_no_volume: true,
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      // data_status: 'streaming',
    };

    console.log("[resolveSymbol]: Symbol resolved", symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },

  // return bars info
  getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
    // if (calledOnce) {
    //   onHistoryCallback([], { noData: true });
    //   return;
    // }
    // calledOnce = true;
    // const data = await getOHLCData();
    // console.log(`data`, data);
    // onHistoryCallback(data, { noData: false });

    const { from, to, firstDataRequest } = periodParams;

    console.log("[getBars]: Method call", symbolInfo, resolution, from, to);
    const parsedSymbol = parseFullSymbol(symbolInfo.full_name);

    const bars = await _getBars(from, to, parsedSymbol);

    if (!!!bars) {
      onErrorCallback(null);
    }

    onHistoryCallback(bars, { noData: false });
  },

  searchSymbols: async (
    userInput,
    exchange,
    symbolType,
    onResultReadyCallback,
  ) => {
    console.log("[searchSymbols]: Method call");
    const symbols = await getAllSymbols();
    const newSymbols = symbols.filter(symbol => {
      const isExchangeValid = exchange === "" || symbol.exchange === exchange;
      const isFullSymbolContainsInput = symbol.full_name
        .toLowerCase()
        .indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });
    onResultReadyCallback(newSymbols);
  },

  subscribeBars: async () => {
  },
};
