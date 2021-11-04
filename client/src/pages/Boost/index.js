// @flow
import React, { useState } from "react";

import { Button, Table } from "react-bootstrap";
// import PageTitle from '../../components/PageTitle';
import StakePage from "./StakePage.js";
import "react-toastify/dist/ReactToastify.css";
import { BPOOLS } from "../../chain/Contracts.js";
import { store } from "../../redux/store";
import { InfoModal } from "./InfoModal";
import { StakeModal } from "./StakeModal";

const VGA_IMG =
  "https://assets.coingecko.com/coins/images/18397/small/big_logo.png?1631769696";
const USDT_IMG =
  "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707";

const IMAGES = {
  USDT: USDT_IMG,
  VGA: VGA_IMG
}

  
const PoolRow = ({ pool }) => {
  console.log(">>> " + pool.poolName);

  return (
    <tr style={{textAlign: "center", color: "white", cellpadding: "10px"}}>
       <td>
        {pool.poolName}&nbsp;&nbsp;
      </td>

      <td>
      <img src={`${IMAGES[pool.stakedUnit]}`} alt="currency"></img>
      </td>

      <td>
      <img src={`${IMAGES[pool.yieldUnit]}`} alt="currency"></img>
      </td>      

      <td>
        <StakeModal pool={pool} />        
      </td>
      <td>
      <InfoModal pool={pool} />
      </td>
      {/* <td>
        TVL
      </td> */}
    </tr>
  );
};

const HeadRow = ({ pool }) => {

  return (
    <tr style={{textAlign: "center", color: "white", cellpadding: "10px"}}>
       <td>
        Poolname
      </td>

      <td>
      Stake currency
      </td>

      <td>
      Yield currency
      </td>     

      <td>
        Stake
      </td>
      <td>
      Info
      </td>

      {/* <td>
        TVL
      </td> */}
    </tr>
  );
};

const PoolsList = () => {
  return (
    <>
      {/* <Table className="mb-0" style={{ width: "40%", border: "solid white 1px;", cellspacing: "10px", backgroundColor: "#1c1f27" }}> */}
      <Table style={{ width: "40%", border: "solid white 1px;", cellspacing: "10px", backgroundColor: "#1c1f27" }}>
        <HeadRow />
        {BPOOLS.map((pool) => {
          return <PoolRow pool={pool} />;
        })}
      </Table>
    </>
  );
};

const BoostPage = () => {
  return (
    <>
      <h1>Pools</h1>
      <PoolsList />
    </>
  );
};

export { BoostPage };

//export { createBoostPoolPage };
