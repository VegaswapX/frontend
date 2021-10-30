import React, { useState } from "react";
import { Button, ButtonGroup, Modal, ToggleButton } from "react-bootstrap";
import { PoolInfo } from "./PoolInfo";
import classNames from 'classnames';

export const InfoModal = ({ pool }) => {
  const [modal, setModal] = useState(false);
  const [size] = useState(null);
  const [className] = useState(null);
  const [scroll] = useState(null);

  const [headerClassName, setHeaderClassName] = useState('');

  const toggle = () => {
    setModal(!modal);
  };

  const openModalWithHeaderClass = (className) => {
    setHeaderClassName(className);
    toggle();
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
        show={modal}
        onHide={toggle}
        
        dialogClassName={className}
        size={size}
        scrollable={scroll}
      >
        <Modal.Header onHide={toggle} closeButton
        className={classNames('modal-colored-header', 'bg-' + headerClassName)}>
          <h4 className="modal-title">Pool Info</h4>
        </Modal.Header>
        <Modal.Body>
          <PoolInfo pool={pool} />
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
