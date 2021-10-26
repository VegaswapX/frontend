import React, { useState } from "react";
import { Button, ButtonGroup, Modal, ToggleButton } from "react-bootstrap";
import { store } from "../../redux/store";

const slippageRadios = [
  { name: "0.3%", value: 0.3 / 100 },
  { name: "0.5%", value: 0.5 / 100 },
  { name: "1%", value: 1 / 100 },
];

export const SettingsModal = (props) => {
  const [modal, setModal] = useState(false);
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  let currentSlippage = store.getState().tradingReducer.slippage;

  const toggle = () => {
    setModal(!modal);
  };

  function setSlippage(x) {
    store.dispatch({ type: "swap/setSlippage", payload: x });
    console.log("setSlippageCall " + x);
  }

  return (
    <>
      {/*TODO: Check about this span here*/}
      <span style={{ marginTop: "20px" }}>
        
        <i
          className="dripicons-gear noti-icon"
          style={{
            textAlign: "right",
            marginLeft: "50px",
            fontSize: "2.0em",
          }}
          onClick={toggle}
        />
      </span>
      {/* </Button> */}

      <Modal
        show={modal}
        onHide={toggle}
        dialogClassName={className}
        size={size}
        scrollable={scroll}
      >
        <Modal.Header onHide={toggle} closeButton>
          <h4 className="modal-title">Settings</h4>
        </Modal.Header>
        <Modal.Body>
          <h2>Slippage</h2>

          <ButtonGroup
            className={"expertOptions"}
            style={{
              margin: "10px 0",
            }}
          >
            {slippageRadios.map((radio, idx) => {
              return (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  name="radio"
                  value={radio.value}
                  checked={currentSlippage === radio.value}
                  onChange={(e) => {
                    setSlippage(radio.value); // no need to parse
                  }}
                >
                  {radio.name}
                </ToggleButton>
              );
            })}
          </ButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={toggle}>
            Close
          </Button>
          {" "}
        </Modal.Footer>
      </Modal>
      {/* </span> */}
    </>
  );
};
