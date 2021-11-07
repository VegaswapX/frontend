// MAINNET
// export const POOL1 = "0x3f8a4C7AA9265eDCA2272197D902a8992698C3A5";
// export const POOL1 = "0x66887872e5dfc545038944ed71ff154430a13c03"
// export const POOL1 = "0xc669D60e646fAFc798d729045eB55aB36b5f0Ae1"
//export const POOL1 = "0x54231A92faf4Da14f4A2e88dbAE512e21693C178";
//export const POOL1 = "0xea77240B0FBcb5300a1EA79FB020Ef9dcbDc6893";
//export const POOL2 = "0x4a3AdC83Bb73e109e967E90289121B060526181c";
export const POOL1 = "0x34CdFC20440Ae40793b0590f316B57a4967f7d4E";
export const POOL2 = "0x5295Aa37083d1028dcD8Bf321732b504AB82DC18";


export const VEGA_TOKEN_ADDRESS = "0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d";
export const BSC_USDT = "0x55d398326f99059fF775485246999027B3197955";
export const LP_TOKEN_ADDRESS = "0xdA6F484F5fFE2382C20F80dCEdcB860Cea955461";

// export const VGA = "0x4EfDFe8fFAfF109451Fc306e0B529B088597dd8d";
export const PCS_FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
export const PCS_ROUTER_ADDRESS = "0x10ed43c718714eb63d5aa57b78b54704e256024e";

// export const POOL1 = "0xE7eD6747FaC5360f88a2EFC03E00d25789F69291";

export const BPOOLS = [
  // {
  //   poolName: "USDT-VGA",
  //   address: POOL1,
  //   description:
  //     "Stake USDT and earn VGA. The staked amount will be locked for the specified time. After the expiration the USDT amount will be returned together with the reward in VGA",
  //   per: "VGA per USDT",
  //   stakedUnit: "USDT",
  //   yieldUnit: "VGA"
  // },
  {
    poolName: "USDT-VGA",
    address: POOL1,
    datestr: "11-08-2021",
    description:
      "Stake USDT and earn VGA. The staked amount will be locked for the specified time. After the expiration the USDT amount will be returned together with the reward in VGA",
    per: "VGA per USDT",
    stakedUnit: "USDT",
    yieldUnit: "VGA",
  },
  {
    poolName: "VGA-VGA",
    datestr: "11-08-2021",
    address: POOL2,
    description:
      "Stake VGA and earn VGA. The staked amount will be locked for the specified time. After the expiration the VGA amount will be returned together with the reward in VGA",
    per: "VGA per VGA",
    stakedUnit: "VGA",
    yieldUnit: "VGA",
  },
  // {
  //   poolName: "USDT-VGA (week 42)",
  //   address: POOL1,
  //   description:
  //     "Stake USDT and earn VGA. The staked amount will be locked for the specified time. After the expiration the USDT amount will be returned together with the reward in VGA",
  //   per: "VGA per USDT",
  //   stakedUnit: "USDT",
  //   yieldUnit: "VGA",
  // },
  // {
  //   poolName: "VGA-VGA (week 42)",
  //   address: POOL2,
  //   description:
  //     "Stake VGA and earn VGA. The staked amount will be locked for the specified time. After the expiration the VGA amount will be returned together with the reward in VGA",
  //   per: "VGA per VGA",
  //   stakedUnit: "VGA",
  //   yieldUnit: "VGA",
  // },
  // {poolName: "USDT", poolAddress: POOL2}
];
