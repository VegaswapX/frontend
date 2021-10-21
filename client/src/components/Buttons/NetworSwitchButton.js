import React, {useState} from 'react'
import {useWeb3React} from "@web3-react/core";
import {Button} from "react-bootstrap";
// import NetworkSelectModal from "../Modal/NetworkSelectModal";
import {supportedChains, LOCAL_NET, BSC_TESTNET, BSC_MAINNET} from "../../chain/eth.js"

const NetworkSwitchButton = () => {
    const { chainId } = useWeb3React()
    const [setShow] = useState(false)

    const handleShow = () => {
        console.log("handleShow")
        setShow(true)
    }
    // const handleClose = () => setShow(false)

    

    function chainEl(){
        switch(chainId){
            case LOCAL_NET:
                return "Localhost"                    
            case BSC_TESTNET:
                return "BSC Testnet";
            case BSC_MAINNET:
                return "BSC Mainnet";                        
            default:
                return "Not supported"
        }    
    }

    if (supportedChains.includes(chainId)){
        return (
            <><Button variant={"outline-primary"} className="me-3" onClick={handleShow}>                    
                        <h5>{chainEl()}</h5>
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