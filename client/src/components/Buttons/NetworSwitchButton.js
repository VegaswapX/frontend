import React, {useState} from 'react'
import {useWeb3React} from "@web3-react/core";
import {Button} from "react-bootstrap";
import NetworkSelectModal from "../Modal/NetworkSelectModal";

const NetworkSwitchButton = () => {
    const { chainId } = useWeb3React()
    const [show, setShow] = useState(false)

    const handleShow = () => {
        console.log("handleShow")
        setShow(true)
    }
    const handleClose = () => setShow(false)

    function chainEl(){
        switch(chainId){
            case 1337:
                return "Localhost"                    
            case 97:
                return "BSC Testnet";
            case 56:
                return "BSC Mainnet";                        
            default:
                return "Not supported"
        }    
    }

    
    return (
        <><Button variant={"outline-primary"} className="me-3" onClick={handleShow}>                    
                    <h4>{chainEl()}</h4>
                    {/* <NetworkSelectModal show={show} onHide={handleClose} /> */}
                    </Button>
        </>
    )        
    
}

export default NetworkSwitchButton