import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { store } from "../../redux/store";
import Tokentable from "./tokentable.js";
import {useSelector} from "react-redux";

function CurrencyButton(props) {
  return (
    <Button
      size="lg"
      style={{
        backgroundColor: "#1f2125",
        border: "3px solid #333",
        borderRadius: "8px",
        height: "50px",
        boxShadow: "none",
      }}
      onClick={props.toggle}
    >
      <img
        src={props.currency.image}
        style={{ width: "24px", height: "24px", marginRight: "10px" }}
      />
      {props.currency.symbol}
    </Button>
  );
}

export function CurrencySelector({ token, tokenIndex }) {
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  const isTokenSelectorModalOpened = useSelector((state) => state.uiReducer.isTokenSelectorModalOpened);

  function toggle() {
    store.dispatch({ type: "ui/toggleTokenSelector" });
  };

  return (
    <span>
      <CurrencyButton currency={token} toggle={toggle} />

      <Modal
        show={isTokenSelectorModalOpened}
        onHide={toggle}
        dialogClassName={className}
        size={size}
        scrollable={scroll}
      >
        <Modal.Header onHide={toggle} closeButton>
          <h4 className="modal-title">Select token</h4>
        </Modal.Header>
        <Modal.Body>
          <Tokentable tokenIndex={tokenIndex} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={toggle}>
            Close
          </Button>
          {" "}
        </Modal.Footer>
      </Modal>
    </span>
  );
}
