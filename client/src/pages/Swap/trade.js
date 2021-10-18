
let WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
let VGA = "0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d";

export async function swapETH(routerContract, amount, amountOutMin, to, deadline){

      const tx = await routerContract.swapExactETHForTokens(
        amountOutMin,
        [WBNB, VGA],
        to,
        deadline,
        {value: amount, gasPrice: 10e9}
      );
      console.log('Transaction Submitted. txhash '+ tx.hash)
      let receipt = await tx.wait();
      console.log(receipt);
      return receipt;

}

//function swapTokensForExactTokens(amountOut,amountInMax,path,to,deadline)
  // async function swapTokens(amountOutMin, to, deadline){

  // }

//function addLiquidity(VGA, BNB){
//const tx = await routerContract.addLiquidity(
//[WBNB, VGA],
//}