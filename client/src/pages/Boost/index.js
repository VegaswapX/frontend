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

const PoolRow = ({ pool }) => {
  console.log(">>> " + pool.poolName);

  return (
    <tr>
      <td>
        {pool.poolName}&nbsp;&nbsp;
        <InfoModal pool={pool} />
      </td>
      <td>
        <StakeModal pool={pool} />
      </td>
    </tr>
  );
};

const PoolsList = () => {
  return (
    <>
      <Table className="mb-0" style={{ width: "40%", border: "0px" }}>
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
