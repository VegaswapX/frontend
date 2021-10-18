// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Balances from './Balances';
// components
// import PageTitle from '../../components/PageTitle';
import Stake from './Stake.js'
import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import {PoolInfo} from './Pool.js';

import POOL_CONTRACT_ABI from "./../../abis/BoostPool.json";

// move to config file
const pools = {
  "0x028f1BfCa59382d2e7982aE91b37c4F9261EbbEd": {
    address: "0x028f1BfCa59382d2e7982aE91b37c4F9261EbbEd",
    abi: POOL_CONTRACT_ABI,
  }
}

const createBoostPoolPage = ({poolName, stakeToken, yieldToken, poolAddress}) => {
  const pool = pools[poolAddress];

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

          <Balances />
          <Row>
            <Col lg={7}>
              <Stake pool={pool} />
            </Col>

            <Col lg={5}>
              {/* <CampaignsChart /> */}

              <Card className={classNames('border', [`border-primary`])}>
                <Card.Body>
                  <Card.Title as="h5">Pool Info</Card.Title>
                  <Card.Text>
                    <PoolInfo />

                  </Card.Text>
                  {/* <button className={classNames('btn', 'btn-sm', [`btn-primary`])}>Button</button> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
    );
  }
};

export {
  createBoostPoolPage
}