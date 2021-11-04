import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import Tokentable from "./tokentable.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

function toggle(tokenIndex) {
  return () => {
    let payload = null;
    if (tokenIndex !== undefined && tokenIndex !== null) {
      payload = { tokenIndex };
    }
    store.dispatch({ type: "ui/toggleTokenSelector", payload });
  };
}

export function CurrencySelectorModal({}) {
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);
  const isTokenSelectorModalOpened = useSelector(
      (state) => state.uiReducer.isTokenSelectorModalOpened,
  );
  const currentModalTokenIndex = useSelector(
      (state) => state.uiReducer.currentModalTokenIndex,
  );

  return (
      <Modal
          show={isTokenSelectorModalOpened}
          onHide={toggle()}
          dialogClassName={className}
          size={size}
          scrollable={scroll}
      >
        <Modal.Header onHide={toggle()} closeButton>
          <h4 className="modal-title">Select token</h4>
        </Modal.Header>
        <Modal.Body>
          <Tokentable tokenIndex={currentModalTokenIndex} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={toggle()}>
            Close
          </Button>
          {" "}
        </Modal.Footer>
      </Modal>
  );
}

export function CurrencySelector({ token, tokenIndex }) {
  const toggleHandle = toggle(tokenIndex);
  // const res = toggleHandle();
  // console.log(`res`, res);
  // console.log(`toggleHandle`, toggleHandle);
  return (
      <Button
          size="lg"
          style={{
            background: "#22262c",
            // border: "3px solid #333",
            // borderRadius: "8px",
            height: "50px",
            width: "140px",
            boxShadow: "none",
            border: "none",
            fontSize: "1rem",
          }}
          onClick={toggleHandle}
      >
        <img
            src={token.image}
            style={{ width: "24px", height: "24px", marginRight: "10px" }}
        />
        {token.symbol}
        <FontAwesomeIcon
            style={{
              marginLeft: "8px"
            }}
            icon={faCaretDown} />
      </Button>
  );
}
