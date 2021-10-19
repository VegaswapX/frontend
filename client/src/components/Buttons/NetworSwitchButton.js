import React, {useState} from 'react'
import {useWeb3React} from "@web3-react/core";
import {Button} from "react-bootstrap";
import NetworkSelectModal from "../Modal/NetworkSelectModal";

const NetworkSwitchButton = () => {
    const { chainId } = useWeb3React()
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    return <>
        {chainId === 1337 ? <Button variant={"outline-primary"} className="me-3" onClick={handleShow}>Localhost</Button>
        : chainId === 97 ? <Button variant={"outline-primary"}>BSC Testnet</Button> : <></>}
        <NetworkSelectModal show={show} onHide={handleClose} />
    </>
}

export default NetworkSwitchButton