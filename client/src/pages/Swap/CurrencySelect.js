import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Tokentable from "./tokentable.js";
import { store } from "../../redux/store";

export const CurrencySelect = (props) => {
  const [modal, setModal] = useState(false);
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <span>
      {/* <div className="button-list"> */}

      <Button
        size="lg"
        style={{ backgroundColor: "#1f2125", border: "none", height: "50px" }}
        onClick={toggle}
      >
        <img
          src={props.currency.image}
          style={{ width: "24px", height: "24px", marginRight: "10px" }}
        />
        {props.currency.symbol}
      </Button>

      <Modal
        show={modal}
        onHide={toggle}
        dialogClassName={className}
        size={size}
        scrollable={scroll}
      >
        <Modal.Header onHide={toggle} closeButton>
          <h4 className="modal-title">Select a token ({props.tokenType})</h4>
        </Modal.Header>
        <Modal.Body>
          <Tokentable tokenType={props.tokenType} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={toggle}>
            Close
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </span>
  );
};
