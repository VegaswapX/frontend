import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { PoolInfo } from "./PoolInfo";

export const InfoModal = ({ pool }) => {
  const [modal, setModal] = useState(false);

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
            Pool Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PoolInfo pool={pool} />
        </Modal.Body>
      </Modal>
    </>
  );
};
