import React from 'react'
import {Button} from "react-bootstrap";

function ApproveButton({allowance, approve}){
    if (allowance === 0) {
        return (
            <Button variant="primary" onClick={() => approve()}>
                Approve
            </Button>
        )
    }
    return (
        <Button variant="secondary">
            Approved
        </Button>
    )
}

export default ApproveButton