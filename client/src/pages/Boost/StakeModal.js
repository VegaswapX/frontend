import React, { useState } from "react";
import { Button, ButtonGroup, Modal, ToggleButton } from "react-bootstrap";
import StakePage from "./StakePage";

export const StakeModal = ({ pool }) => {
  const [modal, setModal] = useState(false);
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

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
        Stake{" "}
      </Button>

      <Modal
        show={modal}
        onHide={toggle}
        dialogClassName={className}
        size={size}
        scrollable={scroll}
      >
        <Modal.Header onHide={toggle} closeButton>
          <h4 className="modal-title">Stake</h4>
        </Modal.Header>
        <Modal.Body>
          <StakePage pool={pool} />
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
