import React from "react";
import { Button } from "react-bootstrap";

function ApproveButton({ approveEnabled, approve }) {
  if (!approveEnabled) {
    return (
      // <Button variant="secondary">
      //     Approved
      // </Button>
      <></>
    );
  }
  return (
    <Button variant="primary" onClick={() => approve()}>
      Approve
    </Button>
  );
}

export default ApproveButton;
