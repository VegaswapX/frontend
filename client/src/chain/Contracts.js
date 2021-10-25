// export const contractMap = {
//     //mainnet

//     97: {
//         "VEGA_TOKEN": "0xDe6D2D63b10c088263B55154638746bD1057312F",
//         "BOOSTPOOL": "0x028f1BfCa59382d2e7982aE91b37c4F9261EbbEd"
//     },
//     197: {
//         "VEGA_TOKEN": "0x39BEa11452610a9469fA2584253E16634C9f6c54",
//         "BOOSTPOOL": "0x87a2518b122953e857d737F21870C413A9752f0e"
//     }
// }

//BSC testnet
// export const VEGA_TOKEN_ADDRESS = "0x39BEa11452610a9469fA2584253E16634C9f6c54";
// export const POOL_TOKEN_ADDRESS = "0x87a2518b122953e857d737F21870C413A9752f0e";

//LCOAL
export const VGA_BNB_POOL_ADDRESS = "";
export const VEGA_TOKEN_ADDRESS = "0x3194cBDC3dbcd3E11a07892e7bA5c3394048Cc87";
export const BSC_USDT = "0x55d398326f99059fF775485246999027B3197955";

export const LP_TOKEN_ADDRESS = "0xdA6F484F5fFE2382C20F80dCEdcB860Cea955461";

//TESTNET
export const POOL1 = "0xE7eD6747FaC5360f88a2EFC03E00d25789F69291";
export const POOL2 = "0xb804b6C73bFc1A1f528985b1410B61677a4B161A";

export const BPOOLS = [
  { poolName: "VGA", address: POOL1 },
  //{poolName: "USDT", poolAddress: POOL2}
];

export function getContract(name) {
  console.log(">>> getContract " + name);
}

//BSC mainnet
// export const VEGA_TOKEN_ADDRESS = "0x18A1938C6D7bCC9459f13832210707FcaEaAB201";
// export const POOL_TOKEN_ADDRESS = "0x081d2605123B574459A014b963d0ad323D336959";
// export const BSC_USDT = "0x18A1938C6D7bCC9459f13832210707FcaEaAB201";
// export const LP_VGABBNB = "0xda6f484f5ffe2382c20f80dcedcb860cea955461";
