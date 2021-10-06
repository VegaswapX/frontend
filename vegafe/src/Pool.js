import React from 'react'
import { useState } from "react";
import { useWeb3React } from "@web3-react/core"
import VEGA_CONTRACT_ABI from './abis/erc20.json';
import POOL_CONTRACT_ABI from './abis/BoostPool.json';
import {useContract} from './eth.js'
import {VEGA_TOKEN_ADDRESS, POOL_TOKEN_ADDRESS} from './Contracts.js'

import { Button} from 'react-bootstrap'

export function PoolInfo() {
  const { account, library, chainId } = useWeb3React()

  //CONTRACT_MAP["BoostPool"]
  const vegaContract = useContract(
    VEGA_TOKEN_ADDRESS,
    VEGA_CONTRACT_ABI,
    true,
  );

  const poolContract = useContract(
    POOL_TOKEN_ADDRESS,
    POOL_CONTRACT_ABI,
    true,
  );

  // const [loading, setLoading] = useState(false);


  const [poolStaked, setPoolstaked] = React.useState()
  const [poolYield, setMaxyield] = React.useState()
  const [startTime, setStartTime] = React.useState()
  const [endTime, setEndTime] = React.useState()

  // const [loading, setLoading] = useState(false);

  
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false       

      poolContract.callStatic.totalAmountStaked()
        .then((x) => {
          if (!stale) {
            setPoolstaked(x);
          }
        })
        .catch(() => {
          if (!stale) {
            setPoolstaked(null)
          }
        })

      return () => {
        stale = true
        setPoolstaked(undefined)
      }
    }
  }, [account, library, chainId, vegaContract, poolContract]) // ensures refresh if referential identity of library doesn't change across chainIds

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false       

      poolContract.callStatic.maxYield()
        .then((x) => {
          if (!stale) {
            setMaxyield(x);
          }
        })
        .catch(() => {
          if (!stale) {
            setMaxyield(null)
          }
        })

      return () => {
        stale = true
        setMaxyield(undefined)
      }

      
    }
  }, [account, library, chainId, poolContract]) // ensures refresh if referential identity of library doesn't change across chainIds

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false       

      poolContract.callStatic.startTime()
        .then((x) => {
          if (!stale) {
            setStartTime(x);
          }
        })
        .catch(() => {
          if (!stale) {
            setStartTime(null)
          }
        })

      return () => {
        stale = true
        setStartTime(undefined)
      }

      
    }
  }, [account, library, chainId, poolContract]) // ensures refresh if referential identity of library doesn't change across chainIds

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false       

      poolContract.callStatic.endTime()
        .then((x) => {
          if (!stale) {
            setEndTime(x);
          }
        })
        .catch(() => {
          if (!stale) {
            setEndTime(null)
          }
        })

      return () => {
        stale = true
        setEndTime(undefined)
      }

      
    }
  }, [account, library, chainId, poolContract]) // ensures refresh if referential identity of library doesn't change across chainIds


  return (
    <div>
      <span>
      
      {/* loading={loading} */}
      Balance in the pool<br />
        % of total staked<br />
        time info<br />
        duration: public(uint256)        
        endTime: public(uint256)

      <div>startTime: {startTime === null ? 'Error' : startTime ? `${startTime}` : ''}</div>
      <div>endTime: {endTime === null ? 'Error' : endTime ? `${endTime}` : ''}</div>

      <br />
      <div>poolStaked: {poolStaked === null ? 'Error' : poolStaked ? `${poolStaked}` : ''}</div>
      <div>poolYield: {poolYield === null ? 'Error' : poolYield ? `${poolYield}` : ''}</div>
      
      
      </span>
      
    </div>
  )
}


export function PoolStake() {
    const { account, library, chainId } = useWeb3React()
  
    //CONTRACT_MAP["BoostPool"]
    const vegaContract = useContract(
      VEGA_TOKEN_ADDRESS,
      VEGA_CONTRACT_ABI,
      true,
    );

    const poolContract = useContract(
      POOL_TOKEN_ADDRESS,
      POOL_CONTRACT_ABI,
      true,
    );
  
    // const [loading, setLoading] = useState(false);
  
    const [vgaallow, setVgaAllowance] = React.useState()

    // const [poolStaked, setPoolstaked] = React.useState()

    const [loading, setLoading] = useState(false);
  
    const approve = async () => {
      console.log("approve " + loading);

      setLoading(true);

      try {
        let approveAmount = 10000;
        await vegaContract.approve(POOL_TOKEN_ADDRESS, approveAmount);
        // await depositLpToken(vegaContract, lpContract, account, amount);
        // addToast({ title: 'Deposit Success', description: "Successfully deposited", type: 'TOAST_SUCCESS' });
        // tokenBalance.refetch();
        // lpBalance.refetch();
      } catch (error) {
        console.log({error})
        // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
      } finally {
        setLoading(false);
        //TODO reload amount
        console.log("approve done");
      }

    }

    const stake = async () => {
      console.log("stake " + poolContract);

      setLoading(true);

      try {
        // let approveAmount = 10000 * 10**18;
        let stakeAmount = 10000;
        await poolContract.stake(stakeAmount);
        // await depositLpToken(vegaContract, lpContract, account, amount);
        // addToast({ title: 'Deposit Success', description: "Successfully deposited", type: 'TOAST_SUCCESS' });
        // tokenBalance.refetch();
        // lpBalance.refetch();
      } catch (error) {
        console.log({error})
        // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
      } finally {
        setLoading(false);
        console.log("stake done");
      }

    }
      
    React.useEffect(() => {
      if (!!account && !!library) {
        let stale = false       
  
        vegaContract.callStatic.allowance(account, POOL_TOKEN_ADDRESS)
          .then((x) => {
            if (!stale) {
              // let z = ethers.utils.formatEther(x);
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
      <div>
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
        <Button 
              variant="secondary" 
              onClick={stake}
              
            >
              Stake
            </Button>  
        <br />        
        
        <input></input>
        </span>
        
      </div>
    )
  }
  