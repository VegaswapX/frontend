// @flow
import { PoolInfoActionTypes } from './constants';


export const changeStakeAmount = (amount: string) => ({
    type: PoolInfoActionTypes.STAKE_AMOUNT,
    payload: amount,
});

export const changeAllowanceAmount = (amount: string) => ({
    type: PoolInfoActionTypes.APPROVE_ALLOWANCE,
    payload: amount
})