// @flow
import React from "react";
import { Row, Col } from "react-bootstrap";
// import Balances from "./Balances";
// components
// import PageTitle from '../../components/PageTitle';
// import Stake from "./Stake.js";
import classNames from "classnames";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styled from 'styled-components';
import { Card } from "react-bootstrap";
// import { PoolInfo } from "./Pool.js";

// import POOL_CONTRACT_ABI from "./../../abis/BoostPool.json";
// import { POOL1 } from "../../chain/Contracts";

// move to config file
// const pools = {
//   POOL1: {
//     address: POOL1,
//     abi: POOL_CONTRACT_ABI,
//   },
// };

const createBoostPoolPage = ({
  poolName,
  // stakeToken,
  // yieldToken,
  poolAddress,
}) => {
  // const pool = pools[poolAddress];

  return () => {
    return (
      <>
        <h1>Boost Pool {poolName}</h1>
        <div>
          <ToastContainer
            progressClassName="toastProgress"
            bodyClassName="toastBody"
          />
        </div>

        {/* <Balances /> */}
        <Row>
          <Col lg={5}>
            <Card className={classNames("border", [`border-primary`])}>
              <Card.Body>
                <Card.Title as="h5">Pool Info</Card.Title>
                <Card.Text>{/* <PoolInfo pool={pool} /> */}</Card.Text>
                {/* <button className={classNames('btn', 'btn-sm', [`btn-primary`])}>Button</button> */}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>{/* <Stake pool={pool} /> */}</Col>
        </Row>
      </>
    );
  };
};

export { createBoostPoolPage };
