// @flow
import React, { useState } from "react";

import { Accordion } from "react-bootstrap";
// import Balances from "./Balances";
// components
// import PageTitle from '../../components/PageTitle';
import StakePage from "./StakePage.js";
import "react-toastify/dist/ReactToastify.css";
import { BPOOLS } from "../../chain/Contracts.js";
import { store } from "../../redux/store";
import { InfoModal } from "./InfoModal";

const PoolRow = ({ pool }) => {
  console.log(">>> " + pool.poolName);

  return (
    <Accordion.Item eventKey="0">
      <Accordion.Header>
        {pool.poolName}
        <InfoModal pool={pool} />
      </Accordion.Header>
      <Accordion.Body>{/* <StakePage pool={pool} /> */}</Accordion.Body>
    </Accordion.Item>
  );
};

const PoolsList = () => {
  return (
    <>
      {BPOOLS.map((pool) => {
        return (
          <Accordion defaultActiveKey="0">
            <PoolRow pool={pool} />
          </Accordion>
        );
      })}
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
