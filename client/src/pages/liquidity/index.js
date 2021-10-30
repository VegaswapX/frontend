// @flow
import React from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";

import { FaDiscord} from 'react-icons/fa';


const LiqPage = () => {
  return (
    <>
      <h1 style={{marginTop: "20px"}}>Liquidity and Marketmaking</h1>

      <Row>
        <Col xl={6}>
          <p style={{fontSize: "18px", marginTop: "20px"}}>To work with Vega on Liquidity provision please participate through the discord in the #liquidity channel: &nbsp;
        <a href="https://discord.gg/NmASQhqprX">Discord <FaDiscord style={{width: "40px", height: "40px"}} /></a>
        </p>
        </Col>

        <Col xl={6}></Col>
      </Row>
    </>
  );
};

export default LiqPage;
