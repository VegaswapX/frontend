import React, { useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { store } from "../../redux/store";

export const SettingsModal = (props) => {
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

  function setSlippageCall(f) {
    console.log("setSlippageCall " + f);
    if (f == 0.003) {
      store.dispatch({ type: "slippage/set3" });
    } else if (f == 0.005) {
      store.dispatch({ type: "slippage/set5" });
    } else if (f == 0.01) {
      store.dispatch({ type: "slippage/set10" });
    }
    let slip = store.getState().slippageReducer.value;
    console.log("slip " + slip);
  }

  return (
    <>
      <span style={{ marginTop: "20px" }}>
        {/* <div className="button-list"> */}

        {
          /* <Button
        size="lg"
        style={{ backgroundColor: "#1f2125", border: "none", height: "50px"}}
        onClick={toggle}
        //class="shadow-none"
      > */
        }
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
            <Button
              onClick={(e) => {
                setSlippageCall(0.003);
              }}
            >
              0.3%
            </Button>
            <Button
              onClick={(e) => {
                setSlippageCall(0.005);
              }}
            >
              0.5%
            </Button>
            <Button
              onClick={(e) => {
                setSlippageCall(0.01);
              }}
            >
              1%
            </Button>

            {
              /* {slippageRadios.map((radio, idx) => {
                return (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    name="radio"
                    value={radio.value}
                    checked={slippage === radio.value}
                    onChange={(e) => {
                      //setSlippage(parseFloat(e.currentTarget.value));
                      setSlippageCall(parseFloat(e.currentTarget.value));
                    }}
                  >
                    {radio.name}
                  </ToggleButton>
                );
              })} */
            }
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

// import React, { useState } from "react";
// import { Button, Modal } from "react-bootstrap";

// const SettingsModal = (props) => {
//   const [modal, setModal] = useState(false);
//   const [size] = useState(null);
//   const [className] = useState(null);
//   const [scroll] = useState(null);

//   // const { xmodal, xsetModal } = useContext(ModalContext);

//   // const currencySelectValue = CurrencyContext(Context);

//   const toggle = () => {
//     setModal(!modal);
//   };

//   return (
//     <span>
//       {/* <div className="button-list"> */}

//       <Button size="lg" style={{ backgroundColor: "#1f2125", border: "none", height: "50px" }} onClick={toggle}>
//         props.currency
//       </Button>

//       <Modal
//         show={modal}
//         onHide={toggle}
//         dialogClassName={className}
//         size={size}
//         scrollable={scroll}
//       >
//         <Modal.Header onHide={toggle} closeButton>
//           <h4 className="modal-title">Select a token</h4>
//         </Modal.Header>
//         <Modal.Body>
//           {/* <span> {{currencySelectValue}}</span> */}

//           <h1>Settings</h1>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="light" onClick={toggle}>
//             Close
//           </Button>
//           {" "}
//         </Modal.Footer>
//       </Modal>
//     </span>
//   );
// };

// export default SettingsModal;
