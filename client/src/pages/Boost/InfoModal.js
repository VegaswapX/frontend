import React, { useState } from "react";
import { Button, ButtonGroup, Modal, ToggleButton } from "react-bootstrap";
import { PoolInfo } from "./PoolInfo";

export const InfoModal = ({ pool }) => {
  const [modal, setModal] = useState(false);
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <i
        className="dripicons-information"
        onClick={toggle}
        style={{ marginLeft: "8px" }}
      ></i>

      <Modal
        show={modal}
        onHide={toggle}
        dialogClassName={className}
        size={size}
        scrollable={scroll}
      >
        <Modal.Header onHide={toggle} closeButton>
          <h4 className="modal-title">Pool Info</h4>
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
      {/* </span> */}
    </>
  );
};
