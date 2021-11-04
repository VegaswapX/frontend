import React, { useState } from "react";
import { Button, ButtonGroup, Modal, ToggleButton } from "react-bootstrap";
import { PoolInfo } from "./PoolInfo";
import classNames from "classnames";

export const InfoModal = ({ pool }) => {
  const [modal, setModal] = useState(false);
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  const [headerClassName, setHeaderClassName] = useState("");

  const toggle = () => {
    setModal(!modal);
  };


  return (
    <>
      {/* <i
        className="dripicons-information"
        onClick={toggle}
        style={{ marginLeft: "8px" }}
      >    
     </i>  */}
      <Button onClick={toggle} style={{ marginLeft: "20px" }}>
        Details{" "}
      </Button>

      {/* <Button variant="dark" onClick={() => openModalWithHeaderClass('dark')}>
                Dark Header
      </Button> */}

      <Modal
        size="lg"
        show={modal}
        onHide={toggle}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Stake
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <PoolInfo pool={pool} />
          </Modal.Body>
      </Modal>

      
    </>
  );
};
