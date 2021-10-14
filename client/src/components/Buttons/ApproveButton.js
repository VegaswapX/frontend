import React from 'react'
import {Button} from "react-bootstrap";

function ApproveButton({allowance, approve}){
    if (allowance > 0.0) {
        return (
            <Button variant="secondary">
                Approved
            </Button>
        )   
    }    
    return (
        <Button variant="primary" onClick={() => approve()}>
            Approve
        </Button>
    )
    
}

export default ApproveButton