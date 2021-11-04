export const TokenList = {
  BSC: {
    USDC: {
      address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      image: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
      dollarvolume: 0,
      name: "USD Coin",
      symbol: "USDC",
      decimals: 18,
      coinGeckoId: "binancecoin", // add to get usdt value
    },
    VGA: {
      address: "0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d",
      image: "https://assets.coingecko.com/coins/images/18397/large/big_logo.png?1631769696",
      dollarvolume: 0,
      name: "Vega Token",
      symbol: "VGA",
      decimals: 18,
    },
    WBNB: {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      image: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615",
      dollarvolume: 0,
      name: "Binance Smart Chain BNB",
      symbol: "WBNB",
      decimals: 18,
      isNative: true,
    },
    USDT: {
      address: "0x55d398326f99059ff775485246999027b3197955",
      image: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707",
      dollarvolume: 0,
      name: "USDT",
      symbol: "USDT",
      decimals: 18,
    },
    BUSD: {
      address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      image: "https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766",
      dollarvolume: 0,
      name: "Binance USD",
      symbol: "BUSD",
      decimals: 18,
    },
    BTC: {
      address: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
      image: "https://assets.coingecko.com/coins/images/14108/large/Binance-bitcoin.png?1617332330",
      name: "Binance BTC",
      symbol: "BTC",
      decimals: 18,
    },
    ETH: {
      address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
      name: "Binance ETH",
      symbol: "ETH",
      decimals: 18,
    },
    CAKE: {
      address: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
      image: "https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png?1629359065",
      name: "CAKE",
      symbol: "CAKE",
      decimals: 18,
    },
  },
};

export function arrayTokenList(tokenList) {
  let res = [];
  for (const [k, v] of Object.entries(tokenList)) {
    res.push(v);
  }
  return res;
}
