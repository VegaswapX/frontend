// @flow
import React from "react";
import { Row, Col } from "react-bootstrap";
import { BNBBalance, Vgabalance, USDTBalance, Lpbalance } from "./Balance.js";

const Balances = () => {
  return (
    <React.Fragment>
      <Row style={{marginTop: "30px"}}>
        <Col lg={6} xl={3}>
          <BNBBalance />
        </Col>

        <Col lg={6} xl={3}>
          <Vgabalance />
        </Col>
        <Col lg={6} xl={3}>
          <USDTBalance />
        </Col>
        <Col lg={6} xl={3}>
          <Lpbalance />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Balances;
