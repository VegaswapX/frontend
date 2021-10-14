import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

import { network } from "./connectors";
import useEagerConnect from "../hooks/useEagerConnect";
import useInactiveListener from "../hooks/useInactiveListener";

function Web3ConnectionManager({ children }) {
  const context = useWeb3React();
  const { connector, activate, active } = context;

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  useEffect(() => {
    if (triedEager && !active) {
      activate(network);
    }
  }, [triedEager, active, connector, activate]);

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  return children;
}

export default Web3ConnectionManager;
