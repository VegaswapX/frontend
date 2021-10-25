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
import { Table } from "react-bootstrap";

import { PoolInfo, PoolInfoSummary } from "./Pool.js";

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
      {/* <h2>Pool {pool.poolName}</h2> */}

      <Row style={{ marginTop: "20px" }}>
        <Col lg={6}>
          <Card className={classNames("border", [`border-primary`])}>
            <Card.Body>
              {/* <Card.Title as="h5">Pool Info</Card.Title> */}
              <Card.Text>
                {/* <PoolInfo pool={pool} /> */}
                <PoolInfoSummary pool={pool} />
              </Card.Text>

              <button className={classNames("btn", "btn-sm", [`btn-primary`])}>
                Info
              </button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>{/* <Stake pool={pool} /> */}</Col>
      </Row>
    </>
  );
}

const PoolsList = () => {
  return (
    <>
      <Table className="mb-0">
        <tbody>
          <tr>
            <th scope="row">Pool name</th>
            <th scope="row">Info</th>
          </tr>
          {BPOOLS.map((pool) => {
            console.log(pool);
            // <p>{pool.poolName}</p>
            return (
              <tr key={8}>
                <td>
                  {" "}
                  {
                    pool === null ? "Error" : pool.poolName
                    // ? `${pool.address.substring(0, 10)}`
                    // : ""
                  }
                </td>
                <td>
                  <button
                    className={classNames("btn", "btn-sm", [`btn-primary`])}
                  >
                    Info
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* <h1>Pools</h1> */}
      {/* {BPOOLS.map((pool) => {
        console.log(pool);
        // <p>{pool.poolName}</p>
        return <PoolPage pool={pool} />;
      })} */}
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
