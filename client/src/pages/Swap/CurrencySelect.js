import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Tokentable from "./tokentable.js";

export const CurrencySelect = (props) => {
  const [modal, setModal] = useState(false);
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  // const { xmodal, xsetModal } = useContext(ModalContext);

  // const currencySelectValue = CurrencyContext(Context);
  // console.log(currencySelectValue);

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
        {props.currency}
      </Button>

      <Modal
        show={modal}
        onHide={toggle}
        dialogClassName={className}
        size={size}
        scrollable={scroll}
      >
        <Modal.Header onHide={toggle} closeButton>
          <h4 className="modal-title">Select a token</h4>
        </Modal.Header>
        <Modal.Body>
          {/* <span> {{currencySelectValue}}</span> */}

          <Tokentable />
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
