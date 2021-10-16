import React from 'react'

function StakeInfo({staked}) {
    return (
        <label className="stakeAmount col-form-label-sm m-3">{`Staked: ${staked}`}</label>
    )
}

export default StakeInfo