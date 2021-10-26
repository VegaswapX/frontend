import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { store } from "../../redux/store";
import Tokentable from "./tokentable.js";

// TODO one component

function CurrencyButton(props) {
  return (
    <Button
      size="lg"
      style={{ backgroundColor: "#1f2125", border: "none", height: "50px" }}
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

export const CurrencySelectIn = () => {
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  let currency = store.getState().tokenReducer.tokenIn;
  let modal = store.getState().uiReducer.modal;

  const toggle = () => {
    if (modal) {
    } else {
      store.dispatch({ type: "ui/tokenselectIn" });
    }
    store.dispatch({ type: "ui/togglemodal" });
  };

  return (
    <span>
      <CurrencyButton currency={currency} toggle={toggle} />

      <Modal
        show={store.getState().uiReducer.modal}
        onHide={toggle}
        dialogClassName={className}
        size={size}
        scrollable={scroll}
      >
        <Modal.Header onHide={toggle} closeButton>
          <h4 className="modal-title">Select a token (In)</h4>
        </Modal.Header>
        <Modal.Body>
          <Tokentable tokenSelect="tokenIn" />
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
};

export const CurrencySelectOut = (props) => {
  const [modal, setModal] = useState(false);
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  let currency = store.getState().tokenReducer.tokenOut;

  const toggle = () => {
    if (modal) {
    } else {
      store.dispatch({ type: "ui/tokenselectOut" });
    }
    setModal(!modal);
    store.dispatch({ type: "ui/togglemodal" });
  };

  return (
    <span>
      {/* <div className="button-list"> */}

      <CurrencyButton currency={currency} toggle={toggle} />

      <Modal
        show={store.getState().uiReducer.modal}
        onHide={toggle}
        dialogClassName={className}
        size={size}
        scrollable={scroll}
      >
        <Modal.Header onHide={toggle} closeButton>
          <h4 className="modal-title">Select a token (Out)</h4>
        </Modal.Header>
        <Modal.Body>
          <Tokentable tokenSelect="tokenOut" />
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
};
