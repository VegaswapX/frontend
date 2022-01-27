import { ApolloClient, createHttpLink, gql, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { TokenList } from "../../chain/tokens";
import { exampleData, minutesData } from "./data";
const BITQUERY_ENDPOINT = `https://graphql.bitquery.io`;
const graphqlCache = new InMemoryCache();

const exampleQuery = gql `
query ($minuteInterval: Int, $baseCurrency: String, $quoteCurrency: String) {
  ethereum(network: bsc) {
    BNBUSDT: dexTrades(
      options: {limit: 500, asc: "timeInterval.minute"}
      exchangeName: {in: ["Pancake", "Pancake v2"]}
      baseCurrency: {is: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"}
      quoteCurrency: {is: "0x55d398326f99059ff775485246999027b3197955"}
      date: {after: "2021-09-14"}
    ) {
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
    dexTrades(
      options: {limit: 500, asc: "timeInterval.minute"}
      exchangeName: {in: ["Pancake", "Pancake v2"]}
      baseCurrency: {is: $baseCurrency}
      quoteCurrency: {is: $quoteCurrency}
      date: {after: "2021-09-14"}
    ) {
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

const httpLink = createHttpLink({
  uri: BITQUERY_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-API-KEY": "BQYm2JSP5yeJIzcHPLGSNlkCA1nQ25nA",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: graphqlCache,
});

function toUnixTime(dt) {
  return dt.getTime();
}

const chain = "BSC";
export async function getOHLCData(baseSymbol, quoteCurrency = TokenList[chain].WBNB, minuteInterval = 1440) {
  const baseCurrency = TokenList[chain][baseSymbol]; // BSC only for now
  if (!!!baseCurrency) {
    console.log(`${baseSymbol} is not found for chain ${chain}`);
    return [];
  }
  console.log(`basecurrency`, baseCurrency);
  console.log(`quoteCurrency`, quoteCurrency);
  try {
    const t0 = performance.now();

    // we get token / wbnb, and wbnb / usdt to make conversion, this varies between token pools and price.
    const res = await client.query({
      query: exampleQuery,
      variables: {
        "minuteInterval": minuteInterval,
        // DEBUG: info
        // "baseCurrency": "0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d",
        // "quoteCurrency": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "baseCurrency": baseCurrency.address,
        "quoteCurrency": quoteCurrency.address,
      },
    });
    const t1 = performance.now();
    // DEBUG
    console.log(`[bitquery] responseTime`, t1 - t0);

    console.log("graphql res", res);
    const { dexTrades, BNBUSDT } = res?.data?.ethereum;

    const chartData = dexTrades.map((x, i) => {
      const isLastBar = i === dexTrades.length - 1;
      const bnbUsdt = BNBUSDT[i];
      // console.log(`x.maximum_price`, x.maximum_price); // there is one with 1.0
      const maximumPrice = x.maximum_price >= 1 ? 0.00001867651364710226 : x.maximum_price; // debug

      const bnbPrice = bnbUsdt.quotePrice;

      return {
        time: toUnixTime(new Date(x.timeInterval.minute)),
        open: parseFloat(x.open_price) * parseFloat(bnbUsdt.open_price),
        high: maximumPrice * bnbPrice,
        low: x.minimum_price * bnbPrice,
        close: parseFloat(x.close_price) * parseFloat(bnbUsdt.close_price),
        isBarClosed: !isLastBar,
        isLastBar,
      };
    });
    return chartData;
  } catch (e) {
    console.log(`e`, e);
  }
}
