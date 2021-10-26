//MAINNET
export const POOL1 = "0xE7eD6747FaC5360f88a2EFC03E00d25789F69291";
export const POOL2 = "";
export const VEGA_TOKEN_ADDRESS = "0x3194cBDC3dbcd3E11a07892e7bA5c3394048Cc87";
export const BSC_USDT = "0x3194cBDC3dbcd3E11a07892e7bA5c3394048Cc87";
export const LP_TOKEN_ADDRESS = "0x3194cBDC3dbcd3E11a07892e7bA5c3394048Cc87";

//export const POOL1 = "0xE7eD6747FaC5360f88a2EFC03E00d25789F69291";

export const BPOOLS = [
  {
    poolName: "USDT-VGA",
    address: POOL1,
    description:
      "Stake USDT and earn VGA. The stake amount will be locked for the specified time. After the expiration the stake token will be returned together with the reward",
    per: "VGA per USDT",
  },
  //{poolName: "USDT", poolAddress: POOL2}
];

export function getContract(name) {
  console.log(">>> getContract " + name);
}
