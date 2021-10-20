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

    const TESTNET = 1337;
    const BSC_MAIN = 56;
    const BSC_TEST = 97;
    const supportedNets = [BSC_MAIN, BSC_TEST, TESTNET];

    function chainEl(){
        switch(chainId){
            case TESTNET:
                return "Localhost"                    
            case BSC_TEST:
                return "BSC Testnet";
            case BSC_MAIN:
                return "BSC Mainnet";                        
            default:
                return "Not supported"
        }    
    }

    console.log(">> " + chainId);

    if (supportedNets.includes(chainId)){
        return (
            <><Button variant={"outline-primary"} className="me-3" onClick={handleShow}>                    
                        <h4>{chainEl()}</h4>
                        {/* <NetworkSelectModal show={show} onHide={handleClose} /> */}
                        </Button>
            </>
        )
    } else {
        return (
            <> </>
        )
    }

    
            
    
}

export default NetworkSwitchButton