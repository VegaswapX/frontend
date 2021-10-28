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

  console.log("CurrencySelectIn ");

  let currency = store.getState().tokenReducer.tokenIn;
  let modal = store.getState().uiReducer.modalTokenIn;

  const toggle = () => {
    if (modal) {
    } else {
      store.dispatch({ type: "ui/tokenselectIn" });
    }
    store.dispatch({ type: "ui/togglemodalTokenIn" });
  };

  return (
    <span>
      <CurrencyButton currency={currency} toggle={toggle} />

      <Modal
        show={modal}
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
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </span>
  );
};

export const CurrencySelectOut = () => {
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  console.log("CurrencySelectOut ");

  let currency = store.getState().tokenReducer.tokenOut;
  let modal = store.getState().uiReducer.modalTokenOut;

  const toggle = () => {
    if (modal) {
    } else {
      store.dispatch({ type: "ui/tokenselectOut" });
    }
    // setModal(!modal);
    store.dispatch({ type: "ui/togglemodalTokenOut" });
  };

  return (
    <span>
      {/* <div className="button-list"> */}

      <CurrencyButton currency={currency} toggle={toggle} />

      <Modal
        show={modal}
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
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </span>
  );
};

export function CurrencySelector({ token }) {
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  let modal = store.getState().uiReducer.modalTokenIn;

  const toggle = () => {
    // TODO: Implement this properly
  };

  return (
    <span>
      <CurrencyButton currency={token} toggle={toggle} />

      <Modal
        show={modal}
        onHide={toggle}
        dialogClassName={className}
        size={size}
        scrollable={scroll}
      >
        <Modal.Header onHide={toggle} closeButton>
          <h4 className="modal-title">Select token</h4>
        </Modal.Header>
        <Modal.Body>
          <Tokentable tokenSelect="tokenIn" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={toggle}>
            Close
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </span>
  );
}
