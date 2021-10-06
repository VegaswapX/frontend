import React from 'react'
import { useState } from "react";
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers";
import VEGA_CONTRACT_ABI from './abis/erc20.json';
import {injected, useContract} from './eth.js'
import {VEGA_TOKEN_ADDRESS, POOL_TOKEN_ADDRESS} from './Contracts.js'

import { Button} from 'react-bootstrap'

export function Approve() {
    const { account, library, chainId } = useWeb3React()
  
    //CONTRACT_MAP["BoostPool"]
    const vegaContract = useContract(
      VEGA_TOKEN_ADDRESS,
      VEGA_CONTRACT_ABI,
      true,
    );
  
    // const [loading, setLoading] = useState(false);
  
    const [vgaallow, setVgaAllowance] = React.useState()

    const [loading, setLoading] = useState(false);
  
    const approve = async () => {
      console.log("approve");

      setLoading(true);

      try {
        await vegaContract.approve(POOL_TOKEN_ADDRESS, 22);
        // await depositLpToken(vegaContract, lpContract, account, amount);
        // addToast({ title: 'Deposit Success', description: "Successfully deposited", type: 'TOAST_SUCCESS' });
        // tokenBalance.refetch();
        // lpBalance.refetch();
      } catch (error) {
        console.log({error})
        // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
      } finally {
        setLoading(false);
        console.log("done");
      }

    }
  
    // React.useEffect(() => {
    //   if (!!account && !!library) {
    //     let stale = false       
  
    //     vegaContract.callStatic.totalSupply()
    //       .then((x) => {
    //         if (!stale) {
    //           let z = ethers.utils.formatEther(x);
    //           setVgaAllowance(x);
    //         }
    //       })
    //       .catch(() => {
    //         if (!stale) {
    //           setVgaAllowance(null)
    //         }
    //       })
  
    //     return () => {
    //       stale = true
    //       setVgaAllowance(undefined)
    //     }
    //   }
    // }, [account, library, chainId, vegaContract]) // ensures refresh if referential identity of library doesn't change across chainIds

    React.useEffect(() => {
      if (!!account && !!library) {
        let stale = false       
  
        vegaContract.callStatic.allowance(account, POOL_TOKEN_ADDRESS)
          .then((x) => {
            if (!stale) {
              let z = ethers.utils.formatEther(x);
              setVgaAllowance(x);
            }
          })
          .catch(() => {
            if (!stale) {
              setVgaAllowance(null)
            }
          })
  
        return () => {
          stale = true
          setVgaAllowance(undefined)
        }
      }
    }, [account, library, chainId, vegaContract]) // ensures refresh if referential identity of library doesn't change across chainIds
  
  
    return (
      <>
        <span>VGA allowance: {vgaallow === null ? 'Error' : vgaallow ? `${vgaallow}` : ''}
        <br />      
        
        {/* loading={loading} */}
        <Button 
              variant="secondary" 
              onClick={approve}
              
            >
              Approve
            </Button>      
        <br />
        <button> stake</button>
        <br />
        <input></input>
        </span>
        
      </>
    )
  }
  