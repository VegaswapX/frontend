// @flow
import React from "react";
import { Row, Col } from "react-bootstrap";
import { BNBBalance, Vgabalance, USDTBalance } from "./Balance.js";

const Balances = () => {
  return (
    <React.Fragment>
      <Row>
        <Col lg={6} xl={3}>
          <BNBBalance />
        </Col>

        <Col lg={6} xl={3}>
          <Vgabalance />
        </Col>
        <Col lg={6} xl={3}>
          <USDTBalance />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Balances;
