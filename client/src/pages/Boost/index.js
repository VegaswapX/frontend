// @flow
import React, { useState } from "react";

import { Accordion } from "react-bootstrap";
// import Balances from "./Balances";
// components
// import PageTitle from '../../components/PageTitle';
import Stake from "./Stake.js";
import "react-toastify/dist/ReactToastify.css";
import { BPOOLS } from "../../chain/Contracts.js";
import { store } from "../../redux/store";

function PoolRow({ pool }) {
  let modal = store.getState().uiReducer.poolInfo;

  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  const toggle = () => {
    console.log("toggle");
    if (modal) {
    } else {
    }
    store.dispatch({ type: "ui/showpoolinfo" });
  };

  return (
    <>
      <Stake pool={pool} />
    </>
  );
}

const PoolsList = () => {
  //console.log(pool.poolName);

  return (
    <>
      {BPOOLS.map((pool) => {
        // <p>{pool.poolName}</p>
        return (
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {
                  pool === null ? "Error" : pool.poolName
                  // ? `${pool.address.substring(0, 10)}`
                  // : ""
                }
              </Accordion.Header>
              <Accordion.Body>
                <PoolRow pool={pool} />
              </Accordion.Body>
            </Accordion.Item>
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
