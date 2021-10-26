// @flow
import React, { useState } from "react";

import { Row, Col, Modal, Button } from "react-bootstrap";
// import Balances from "./Balances";
// components
// import PageTitle from '../../components/PageTitle';
import Stake from "./Stake.js";
import classNames from "classnames";
import "react-toastify/dist/ReactToastify.css";
import { BPOOLS } from "../../chain/Contracts.js";
import { Table } from "react-bootstrap";
import { store } from "../../redux/store";

import { PoolInfo } from "./Pool.js";


function PoolRow({ pool }) {
  let modal = store.getState().uiReducer.poolInfo;

  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  const toggle = () => {
    console.log("toggle");
    if (modal) {
    } else {
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
            <Modal.Header onHide={toggle}>
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
