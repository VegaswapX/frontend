export const tokens = [
  {
    contract: "0x55d398326f99059fF775485246999027B3197955",
    image:
      "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707",
    dollarvolume: 0,
    name: "USDT",
    symbol: "USDT",
  },
  {
    contract: "0x4efdfe8ffaff109451fc306e0b529b088597dd8d",
    image:
      "https://assets.coingecko.com/coins/images/18397/large/big_logo.png?1631769696",
    dollarvolume: 0,
    name: "Vega Token",
    symbol: "VGA",
  },
  {
    contract: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    image:
      "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615",
    dollarvolume: 0,
    name: "BNB",
    symbol: "BNB",
  },
  {
    contract: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    image:
      "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
    dollarvolume: 0,
    name: "USDC",
    symbol: "USDC",
  },
  {
    contract: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    image:
      "https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766",
    dollarvolume: 0,
    name: "BUSD",
    symbol: "BUSD",
  },
  // {"contract": "0X9573C88AE3E37508F87649F87C4DD5373C9F31E0", "image": "https://assets.coingecko.com/coins/images/18396/large/moni.png?1631763118", "dollarvolume": 4720614, "name": "Monsta Infinite"},
  // {"contract": "0X78A499A998BDD5A84CF8B5ABE49100D82DE12F1C", "image": "https://assets.coingecko.com/coins/images/17383/large/JOJO.png?1627462497", "dollarvolume": 83181, "name": "JOJO"},
  // {"contract": "0X6679EB24F59DFE111864AEC72B443D1DA666B360", "image": "https://assets.coingecko.com/coins/images/18103/large/logo-200.png?1630479340", "dollarvolume": 19683908, "name": "Ariva"},
  // {"contract": "0X82C19905B036BF4E329740989DCF6AE441AE26C1", "image": "https://assets.coingecko.com/coins/images/17544/large/cp.PNG?1628203894", "dollarvolume": 136255, "name": "CoPuppy"},
];

export const TokenList = {
  BSC: {
    USDC: {
      address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      image:
        "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
      dollarvolume: 0,
      name: "USD Coin",
      symbol: "USDC",
      decimals: 18,
    },
    VGA: {
      address: "0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d",
      image:
        "https://assets.coingecko.com/coins/images/18397/large/big_logo.png?1631769696",
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
      image:
        "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707",
      dollarvolume: 0,
      name: "USDT",
      symbol: "USDT",
      decimals: 18,
    },
    BUSD: {
      address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      image:
        "https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766",
      dollarvolume: 0,
      name: "Binance USD",
      symbol: "BUSD",
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

export default tokens;
