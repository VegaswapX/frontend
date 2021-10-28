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
                  //onClick={() => removeFile(i)}
                }
                <i className="dripicons-information" style={{ marginLeft: "8px"}} ></i>
              </Accordion.Header>
              <Accordion.Body>
              <StakePage pool={pool} />
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
