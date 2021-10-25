// @flow
import React from "react";
import { Row, Col } from "react-bootstrap";
// import Balances from "./Balances";
// components
// import PageTitle from '../../components/PageTitle';
import Stake from "./Stake.js";
import classNames from "classnames";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styled from 'styled-components';
import { Card } from "react-bootstrap";
import { BPOOLS } from "../../chain/Contracts.js";

import { PoolInfo } from "./Pool.js";

function PoolPage({ pool }) {
  //pool
  //poolName,
  // stakeToken,
  // yieldToken,
  //poolAddress,
  // const pool = pools[poolAddress];

  console.log(pool.poolName);

  return (
    <>
      <h2>Pool {pool.poolName}</h2>

      <Row>
        <Col lg={5}>
          <Card className={classNames("border", [`border-primary`])}>
            <Card.Body>
              {/* <Card.Title as="h5">Pool Info</Card.Title> */}
              <Card.Text>
                <PoolInfo pool={pool} />
              </Card.Text>
              {/* <button className={classNames("btn", "btn-sm", [`btn-primary`])}>
                Button
              </button> */}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Stake pool={pool} />
        </Col>
      </Row>
    </>
  );
}

const BoostPage = () => {
  return (
    <>
      {/* <h1>Pools</h1> */}
      {BPOOLS.map((pool) => {
        console.log(pool);
        // <p>{pool.poolName}</p>
        return <PoolPage pool={pool} />;
      })}
    </>
  );
};

export { BoostPage };

//export { createBoostPoolPage };
