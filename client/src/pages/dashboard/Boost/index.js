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

export function createBoostPage() {
  return BoostPage;
}

const BoostPage = () => {
  return (
      <>
        <h1>Boost Pool USDT</h1>

        <div>
          <ToastContainer
              progressClassName="toastProgress"
              bodyClassName="toastBody"
          />
        </div>

        <Balances />

        <Row>

          <Col lg={7}>
            <Stake />
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
};

export default BoostPage;
