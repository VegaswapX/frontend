// MAINNET

export const POOL1 = "0xD3F06D584908467B567E0F779D464349E786F3D8";
export const POOL2 = "0xC69589D2fdf47bF5c62a65353268bdF5381Bc3AF";

export const VEGA_TOKEN_ADDRESS = "0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d";
export const BSC_USDT = "0x55d398326f99059fF775485246999027B3197955";
export const LP_TOKEN_ADDRESS = "0xdA6F484F5fFE2382C20F80dCEdcB860Cea955461";

export const PCS_FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
export const PCS_ROUTER_ADDRESS = "0x10ed43c718714eb63d5aa57b78b54704e256024e";

export const BPOOLS = [
  {
    poolName: "USDT-VGA",
    address: POOL1,
    datestr: "2021-11-08",
    description:
      "Stake USDT and earn VGA. The staked amount will be locked for the specified time. After the expiration the USDT amount will be returned together with the reward in VGA",
    per: "VGA per USDT",
    stakedUnit: "USDT",
    yieldUnit: "VGA",
  },
  {
    poolName: "VGA-VGA",
    datestr: "2021-11-08",
    address: POOL2,
    description:
      "Stake VGA and earn VGA. The staked amount will be locked for the specified time. After the expiration the VGA amount will be returned together with the reward in VGA",
    per: "VGA per VGA",
    stakedUnit: "VGA",
    yieldUnit: "VGA",
  }  
];
