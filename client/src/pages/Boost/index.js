// @flow
import React from "react";

import { Table } from "react-bootstrap";
// import PageTitle from '../../components/PageTitle';
import "react-toastify/dist/ReactToastify.css";
import { BPOOLS } from "../../chain/Contracts.js";
import { InfoModal } from "./InfoModal";
import { StakeModal } from "./StakeModal";
import {
  Row,
  Col
} from "react-bootstrap";

const VGA_IMG =
  "https://assets.coingecko.com/coins/images/18397/small/big_logo.png?1631769696";
const USDT_IMG =
  "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707";

const IMAGES = {
  USDT: USDT_IMG,
  VGA: VGA_IMG,
};

const PoolRow = ({ pool }) => {
  console.log(">>> " + pool.poolName);

  return (
    <tr style={{ textAlign: "center", color: "white", cellpadding: "10px" }}>
      <td>{pool.poolName}&nbsp;&nbsp;</td>

      <td>
        <img src={`${IMAGES[pool.stakedUnit]}`} alt="currency"></img>
      </td>

      <td>
        <img src={`${IMAGES[pool.yieldUnit]}`} alt="currency"></img>
      </td>

      <td>
        <InfoModal pool={pool} />
      </td>

      <td>
        <StakeModal pool={pool} />
      </td>
      
      {/* <td>
        TVL
      </td> */}
    </tr>
  );
};

const HeadRow = ({ pool }) => {
  return (
    <tr style={{ textAlign: "center", color: "white", cellpadding: "10px" }}>
      <td>Poolname</td>

      <td>Stake currency</td>

      <td>Yield currency</td>

      <td>Information</td>
      <td>Stake Action</td>

      {/* <td>
        TVL
      </td> */}
    </tr>
  );
};

const PoolsList = () => {
  return (
    <>
      {/* <Table className="mb-0" style={{ width: "40%", border: "solid white 1px;", cellspacing: "10px", backgroundColor: "#1c1f27" }}> */}
      <Table
        style={{
          width: "80%",
          marginTop: "30px",
          marginLeft: "10%",
          fontSize: "16px",
          border: "solid white 1px;",
          cellspacing: "10px",
          backgroundColor: "#1c1f27",
        }}
      >
        <HeadRow />
        {BPOOLS.map((pool) => {
          return <PoolRow pool={pool} />;
        })}
      </Table>
    </>
  );
};

const BoostPage = () => {
  return (
    <>
      <Row>
        <Col lg={12}>
          <div
            style={{
              width: "50%",
              backgroundColor: "#1c1f27",
              color: "white",
              margin: "0 auto",
              marginTop: "2rem",
              padding: "10px",
              boxShadow:
                "rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px",
              borderRadius: "24px",
              border: "1px solid #000",
            }}
          >
           <h1 style={{marginLeft: "45%"}}>Pools</h1>
            <PoolsList />
          </div>
        </Col>
      </Row>
    </>

  );
};

export { BoostPage };

//export { createBoostPoolPage };
