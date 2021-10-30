import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { CurrencySelector } from "./CurrencySelect";

export function TokenInput(
  tokenInput,
  token,
  tokenIndex,
  handleChange,
  opts = { disabled: false },
) {
  const { disabled } = opts;

  return (
    <div
      style={{
        background: "#22262c",
        height: "70px",
        borderRadius: "10px",
        width: "100%",
        padding: "5px",
      }}
    >
      <InputGroup className="mb-3">
        <div
          style={{
            marginLeft: "5px",
            marginTop: "5px",
          }}
        >
          <CurrencySelector token={token} tokenIndex={tokenIndex} />
        </div>

        <FormControl
          size="lg"
          type="number"
          placeholder="Amount"
          aria-label="Amount"
          aria-describedby="token0Input"
          value={tokenInput}
          disabled={disabled}
          style={{
            textAlign: "left",
            fontFamily: "Helvetica",
            fontSize: "1.3rem",
            height: "50px",
            border: "none",
            marginTop: "5px",
            marginLeft: "20px",
            background: "#1f2125",
          }}
          onChange={handleChange}
        />
      </InputGroup>
    </div>
  );
}
