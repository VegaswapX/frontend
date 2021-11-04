import axios from "axios";

const CG_BASE = "https://api.coingecko.com/api/v3/simple/";
const URL = CG_BASE + "price?ids=binancecoin,vegaswap&vs_currencies=usd";

export async function getTokensPrices(tokens = ["binancecoin", "vegaswap"]) {
  const tokensUrl = tokens.join(",");
  const url = `${CG_BASE}price?ids=${tokensUrl}&vs_currencies=usd`;
  return fetch(url);
}

function getPrices() {
  return new Promise((resolve) => {
    let res = axios.get(URL);
    if (res) {
      resolve(res);
    }
    //   setTimeout(() => {
    //     resolve('resolved');
    //   }, 2000);
  });
}

export async function agetPrices() {
  console.log("calling agetPrices");
  const result = await getPrices();
  if (result) {
    console.log("price " + result.data["binancecoin"]);
  }
}
