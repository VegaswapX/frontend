import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { CurrencySelector } from "./CurrencySelect";

export function TokenInput(
  tokenInput,
  token,
  tokenIndex,
  handleChange,
  opts = {
    disabled: false,
    fromTo: "from",
    balance: "Loading",
    clickMaxHandler: (e) => {},
  }
) {
  const { disabled, fromTo, balance, clickMaxHandler } = opts;
  const balanceText = balance === undefined ? "Loading" : balance;

  return (
    <div
      style={{
        background: "#22262c",
        borderRadius: "10px",
        width: "100%",
        padding: "10px",
      }}
    >
      <div
        className={"TokenInput-extra-info"}
        style={{
          display: "flex",
          flexFlow: "row wrap",
          alignContent: "space-between",
          alignItems: "center",
          paddingBottom: "5px",
        }}
      >
        <div>{fromTo}</div>
        <div
          style={{
            marginLeft: "auto",
          }}
        >
          Balance: {balanceText}
        </div>
      </div>

      <InputGroup
        style={{
          alignItems: "center",
        }}
      >
        <div>
          <CurrencySelector token={token} tokenIndex={tokenIndex} />
        </div>

        <span onClick={clickMaxHandler} className={"TokenInput-max-button"}>
          MAX
        </span>

        <FormControl
          size="lg"
          type="number"
          placeholder="Amount"
          aria-label="Amount"
          aria-describedby="token0Input"
          value={tokenInput}
          disabled={disabled}
          style={{
            // textAlign: "left",
            // fontFamily: "Helvetica",
            // fontSize: "1.3rem",
            // height: "50px",
            // border: "none",
            // marginTop: "5px",
            borderRadius: "8px",
            background: "#1f2125",
          }}
          onChange={handleChange}
        />
      </InputGroup>
    </div>
  );
}
