// @flow
import React, { useState } from "react";

import { Row, Col, Modal, Button } from "react-bootstrap";
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
import { store } from "../../redux/store";

import { PoolInfo } from "./Pool.js";

function PoolPage({ pool }) {
  //pool
  //poolName,
  // stakeToken,
  // yieldToken,
  //poolAddress,
  // const pool = pools[poolAddress];

  let modal = store.getState().uiReducer.poolInfo;

  const toggle = () => {
    console.log("toggle");
    if (modal) {
    } else {
      //store.dispatch({ type: "ui/showpoolinfo" });
    }
    store.dispatch({ type: "ui/showpoolinfo" });
  };

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
                {/* <PoolInfoSummary pool={pool} /> */}
              </Card.Text>

              <button
                className={classNames("btn", "btn-sm", [`btn-primary`])}
                onClick={toggle}
              >
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

function PoolRow({ pool }) {
  let modal = store.getState().uiReducer.poolInfo;

  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  const toggle = () => {
    console.log("toggle");
    if (modal) {
    } else {
      //store.dispatch({ type: "ui/showpoolinfo" });
    }
    store.dispatch({ type: "ui/showpoolinfo" });
  };

  return (
    <>
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
            onClick={toggle}
            className={classNames("btn", "btn-sm", [`btn-primary`])}
          >
            Details
          </button>

          <Modal
            show={store.getState().uiReducer.poolInfo}
            onHide={toggle}
            dialogClassName={className}
            size={size}
            scrollable={scroll}
          >
            <Modal.Header onHide={toggle} closeButton>
              <h4 className="modal-title">Pool Information</h4>
            </Modal.Header>
            <Modal.Body>
              <PoolInfo pool={pool} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={toggle}>
                Close
              </Button>{" "}
            </Modal.Footer>
          </Modal>
        </td>
      </tr>
      <tr>Stake</tr>
    </>
  );
}

const PoolsList = () => {
  //console.log(pool.poolName);

  return (
    <>
      <Table className="mb-0" style={{ width: "80%" }}>
        <tbody>
          {/* <tr>
            <th scope="row">Pool name</th>
            <th scope="row">Info</th>
          </tr> */}
          {BPOOLS.map((pool) => {
            console.log(pool);
            // <p>{pool.poolName}</p>
            return <PoolRow pool={pool} />;
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
