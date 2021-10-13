import React, {useEffect, useState} from 'react'
import {useWeb3React} from "@web3-react/core";
import {useContract} from "../../../chain/eth";
import {POOL_TOKEN_ADDRESS} from "../../../chain/Contracts";
import POOL_CONTRACT_ABI from "../../../abis/BoostPool.json";

function StakeInfo() {
    const { account, library } = useWeb3React();
    const poolContract = useContract(POOL_TOKEN_ADDRESS, POOL_CONTRACT_ABI, true);
    const [mystake, setMyStake] = useState(0);

    useEffect(() => {
        if (!!account && !!library) {
            let stale = false;

            poolContract.callStatic
                .stakes(account)
                .then((x) => {
                    if (!stale) {
                        console.log("!! stakes: " + x);
                        setMyStake(x[1]);
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setMyStake(0);
                    }
                });

            return () => {
                stale = true;
                setMyStake(undefined);
            };
        }
    }, [account, library, poolContract]);

    return (
        <label className="col-form-label-sm m-3">{`Staked: ${mystake}`}</label>
    )
}

export default StakeInfo