// noinspection BadExpressionStatementJS

import React from 'react'
import {Modal} from "react-bootstrap";

const NetworkSelectModal = ({show, onHide}) => {
    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Network Switch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Network switch content
                </Modal.Body>
            </Modal>
        </>
    )

}

export default NetworkSelectModal