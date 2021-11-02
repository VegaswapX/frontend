import axios from 'axios';

const CG_BASE = "https://api.coingecko.com/api/v3/simple/";
const URL = CG_BASE + "price?ids=binancecoin,vegaswap&vs_currencies=usd";

function getPrices() {
    return new Promise(resolve => {
      let res = axios.get(URL);
      if (res){
        resolve(res);  
      }
    //   setTimeout(() => {
    //     resolve('resolved');
    //   }, 2000);
    });
  }

export async function agetPrices() {
  console.log('calling agetPrices');
  const result = await getPrices();
  if (result) {
      console.log("price " + result.data["binancecoin"]);
  }
}