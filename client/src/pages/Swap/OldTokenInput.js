// function TokenInputUI(
//     tokenInput,
//     tokenSelect,
//     handleChange,
//     opts = { disabled: false },
//   ) {
//     const { disabled } = opts;
  
//     const { account, library, chainId } = useWeb3React();
  
//     let currencyIn = store.getState().tokenReducer.tokenIn;
//     let currencyOut = store.getState().tokenReducer.tokenOut;
  
//     console.log("currencyIn.contract " + currencyIn.contract);  
  
//     const tokenContractIn = useContract(currencyIn.contract, VEGA_CONTRACT_ABI, true);
//     const tokenContractOut = useContract(currencyOut.contract, VEGA_CONTRACT_ABI, true);
  
//     // const [bal, setBalance] = useState();
//     // const [balOut, setBalanceOut] = useState();
  
//     // useEffect(() => {
//     //   if (!!account && !!library) {
//     //     let stale = false;
  
//     //     tokenContractIn.callStatic
//     //       .balanceOf(account)
//     //       .then((x) => {
//     //         if (!stale) {
//     //           x = x / 10 ** 18;
//     //           x = Math.round(x*100)/100;
//     //           setBalance(x);
//     //         }
//     //       })
//     //       .catch(() => {
//     //         if (!stale) {
//     //           setBalance(null);
//     //         }
//     //       });
  
//     //     return () => {
//     //       stale = true;
//     //       setBalance(undefined);
//     //     };
//     //   }
//     // }, [account, library, chainId, tokenContractIn]);
  
//     // useEffect(() => {
//     //   if (!!account && !!library) {
//     //     let stale = false;
  
//     //     tokenContractOut.callStatic
//     //       .balanceOf(account)
//     //       .then((x) => {
//     //         if (!stale) {
//     //           x = x / 10 ** 18;
//     //           x = Math.round(x*100)/100;
//     //           setBalanceOut(x);
//     //         }
//     //       })
//     //       .catch(() => {
//     //         if (!stale) {
//     //           setBalanceOut(null);
//     //         }
//     //       });
        
//     //   }
//     // }, [account, library, chainId, tokenContractOut]);
  
//     return (
//       <div
//         style={{
//           background: "#22262c",
//           height: "70px",
//           borderRadius: "10px",
//           width: "100%",
//           padding: "5px",
//         }}
//       >
//         <InputGroup className="mb-3">
//           <div
//             style={{
//               marginLeft: "5px",
//               marginTop: "5px",
//             }}
//           >
//             {/* {tokenSelect === "tokenIn" ? <CurrencySelectIn /> : <CurrencySelectOut />} */}
//           </div>
  
          
//           <div
//             style={{
//               marginLeft: "5px",
//               marginTop: "5px",
//             }}
//           >
//             {/* {tokenSelect === "tokenIn" ? currencyIn.symbol : currencyOut.symbol} */}
//             {/* <p>Balance {tokenSelect === "tokenIn" ? bal : balOut}</p> */}
//           </div>
  
//           <FormControl
//             size="lg"
//             type="number"
//             placeholder="Amount"
//             aria-label="Amount"
//             aria-describedby="token0Input"
//             value={tokenInput}
//             disabled={disabled}
//             style={{
//               textAlign: "left",
//               fontFamily: "Helvetica",
//               fontSize: "1.3rem",
//               height: "50px",
//               border: "none",
//               marginTop: "5px",
//               marginLeft: "20px",
//               background: "#1f2125",
//             }}
//             onChange={handleChange}
//           />
//         </InputGroup>
//       </div>
//     );
//   }
  
  