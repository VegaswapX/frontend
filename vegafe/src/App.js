import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useMemo } from "react";

import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Container, Navbar, Nav , Button, Row, Col, Card} from 'react-bootstrap'
import './styles.css'

// import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from "ethers";

// const {utils, BigNumber} = require('ethers');

import VEGA_CONTRACT_ABI from './abis/erc20.json';

import Web3 from "web3";
// import { Web3ReactProvider } from '@web3-react/core'

import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core"
import { formatEther } from '@ethersproject/units'
// import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';

import { Contract } from '@ethersproject/contracts';

import WrappedWeb3ReactProvider from './WrappedWeb3ReactProvider';

import { useQuery } from 'react-query';






// returns the checksummed address if the address is valid, otherwise returns false
// export function isAddress(value) {
//   try {
//     return getAddress(value);
//   } catch {
//     return false;
//   }
// }

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library,
  account,
) {
  return account ? getSigner(library, account) : library;
}

// account is optional
function getContract(
  address,
  ABI,
  library,
  account,
) {
  // if (!isAddress(address) || address === AddressZero) {
  //   throw Error(`Invalid 'address' parameter '${address}'.`);
  // }
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

const useContract = (
  address,
  ABI,
  withSignerIfPossible = true,
) => {
  // const { library, account } = useActiveWeb3React();
  

  const { account, library, chainId } = useWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      console.log("get contract " + address);
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined,
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
};



export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337],
})

// https://assets.coingecko.com/coins/images/18397/small/big_logo.png?1631769696

export const getEthereum = async () => {

  // event listener is not reliable
  while (document.readyState !== "complete") {
      await new Promise(resolve => setTimeout(resolve, 100))
  }

  return window.ethereum

}

//TODO remove?
export const getWeb3 = async () => {

    const ethereum = await getEthereum()
    let web3

    if (ethereum) {
        web3 = new Web3(ethereum)
    } else if (window.web3) {
        web3 = window.web3
    } else {
        //TODO
        const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:8545"
        );
        web3 = new Web3(provider)
    }

    return web3
}

function BoostPools() {
  return (
    <>
      <h1>BoostPools</h1>
      <Container>
  <Row>
    <Col>
    <Card style={{ width: '18rem' }}>
    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    <Card.Body>
      <Card.Title>Balances</Card.Title>
      <Card.Text>        
        <Balance />
      </Card.Text>
      {/* <Button variant="primary">Go somewhere</Button> */}
    </Card.Body>
    </Card>

    
    </Col>
    <Col>
    <Card style={{ width: '18rem' }}>
    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    <Card.Body>
      <Card.Title>Balance</Card.Title>
      <Card.Text>
      <VGABalance/>
      </Card.Text>
      {/* <Button variant="primary">Go somewhere</Button> */}
      
    </Card.Body>
    </Card>
</Col>

<Col>
<Card style={{ width: '18rem' }}>
    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    <Card.Body>
      <Card.Title>Pool Info</Card.Title>
      <Card.Text>
      info.. 
      
      
      </Card.Text>
      {/* <Button variant="primary">Go somewhere</Button> */}
    </Card.Body>
    </Card>
</Col>

  </Row>

  <Row style={{ marginTop: '1rem' }}>

    <Col>
    <Card style={{ width: '18rem' }}>
    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    <Card.Body>
      <Card.Title>ROI info</Card.Title>
      <Card.Text>
      ROI
      APY
      </Card.Text>
      {/* <Button variant="primary">Go somewhere</Button> */}
    </Card.Body>
    </Card>
    </Col>
    <Col>Pool balance</Col>
    <Col>3 of 3</Col>

  </Row>
</Container>
    
      
    </>
  )
}

function LiquidityMining() {
  return (
    <>
      <h1>LiquidityMining</h1>
      <p>
       google form

      </p>
    </>
  )
}

function About() {
  return (
    <>
      <h1>About</h1>
      <p>
        Info
      </p>
    </>
  )
}

function truncate(str) {
  if (str.includes('.')) {
      const parts = str.split('.');
      return parts[0];
  }
  return str;
}

function Balance() {
  const { account, library, chainId } = useWeb3React()

  const [balance, setBalance] = React.useState()
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false

      console.log("library " + library);
      console.log("account " + account);

      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            let z = ethers.utils.formatEther(balance);
            // balance = "" + balance;
            // // console.log(">> " + balance);
            // // console.log("??? >> " + typeof(balance));
            // balance = truncate(balance);
            // console.log("??? >> " + balance);
            
            // var z = ethers.utils.formatEther(balance);
            setBalance(z);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>BNB Balance</span>
      <span role="img" aria-label="gold">
      {/* <img 
      src="https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707"
      alt="new"
      /> */}
      <img 
      src="https://assets.coingecko.com/coins/images/825/thumb_2x/binance-coin-logo.png?1547034615"
      alt="new"
      />
      
      </span>
      
      {/* <span>{balance === null ? 'Error' : balance ? `${formatEther(balance)}` : ''}</span> */}
      <span>{balance === null ? 'Error' : balance ? `${balance}` : ''}</span>
    </>
  )
}

const refetchInterval = 3000;

function VGABalance() {
  const { account, library, chainId } = useWeb3React()

  //CONTRACT_MAP["BoostPool"]
  const vegaContract = useContract(
    "0xDe6D2D63b10c088263B55154638746bD1057312F",
    VEGA_CONTRACT_ABI,
    true,
  );

  console.log("VGABalance vegaContract " + vegaContract);

  // const tokenBalance = useQuery<BigNumber>('token-balance', async () => {
  //   if (vegaContract && account) {
  //     console.log("!>> " + vegaContract.address)
  //     const v1Balance = await vegaContract.callStatic.balanceOf(account);
  //     return v1Balance;
  //   } else {
  //     return BigNumber.from('0');
  //   }
  // }, { refetchInterval })

  // console.log("tokenBalance " + tokenBalance);

  const [loading, setLoading] = useState(false);

  const [vgabalance, setVgaBalance] = React.useState()

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false

      console.log("library " + library);
      console.log("account " + account);

      vegaContract.callStatic.balanceOf(account)
        .then((x) => {
          if (!stale) {
            let z = ethers.utils.formatEther(x);
            console.log(">>>> " + z);
            setVgaBalance(z);
          }
        })
        .catch(() => {
          if (!stale) {
            // setVgaBalance(null)
          }
        })

      return () => {
        stale = true
        // setVgaBalance(undefined)
      }
    }
  }, [account, library, chainId, vegaContract]) // ensures refresh if referential identity of library doesn't change across chainIds



  const LoadData = async () => {
    console.log("LoadData");
    if (vegaContract && account) {
      setLoading(true);

      try {
        // await depositLpToken(vegaContract, lpContract, account, amount);
        // addToast({ title: 'Deposit Success', description: "Successfully deposited", type: 'TOAST_SUCCESS' });
        // tokenBalance.refetch();
        // lpBalance.refetch();
      } catch (error) {
        console.log({error})
        // addToast({ title: 'Deposit Token error!', description: error.message, type: 'TOAST_ERROR' });
      } finally {
        setLoading(false);
      }
    }
  };

  
  return (
    <>
      {/* <span>VGA Balance {vgabalance}</span> */}
      <span>VGA Balance: {vgabalance === null ? 'Error' : vgabalance ? `${vgabalance}` : ''}</span>
      {/* <Button onClick={LoadData}  variant="info">Load</Button>{' '} */}
      {/* <span role="img" aria-label="gold">
      
      </span>
      
      <span>{balance === null ? 'Error' : balance ? `${formatEther(balance)}` : ''}</span> */}
    </>
  )
}


const routes = [
  { path: '/', name: 'BoostPools', Component: BoostPools },
  { path: '/mining', name: 'LiquidityMining', Component: LiquidityMining },
  { path: '/about', name: 'About', Component: About }
]

function InnerApp() {
  // const { chainId, account, activate, active } = useWeb3React<Web3Provider>()
  const { chainId, active, account, library, connector, activate, deactivate } = useWeb3React()
  

  // const balance = useEthBalance();

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <Router>
      <>
      <Navbar bg="dark" variant="dark" className="ml-auto">
          <Nav className="mx-auto">
            
          <Navbar.Brand href="#home">Vegaswap</Navbar.Brand>
            {routes.map(route => (
              <Nav.Link
                key={route.path}
                as={NavLink}
                to={route.path}
                activeClassName="active"
                exact
              >
                {route.name}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
              <Nav.Link disabled className={'d-flex align-items-center'}>
                  {active ? <span>Account: <b>{account}</b></span> : <span>Not connected</span>}
              </Nav.Link>
              <Nav.Link>
                  {/* {active ? <span>Balance: <b>{balance}</b></span> : <span>Not connected</span>} */}
                  {active ?
                      <Button onClick={connect}  variant="primary">...</Button> :
                      <Button onClick={connect}  variant="primary">Connect to MetaMask</Button>}
              </Nav.Link>
              <Nav.Link className={"nav-right"}>
                  <Button onClick={disconnect}  variant="info">Disconnect</Button>
              </Nav.Link>
          </Nav>
      </Navbar>
        <Container className="container">
        
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">


                    <div className="flex flex-col items-center justify-center">
                    <Component />
                  </div>
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </Container>
      </>
    </Router>
  )
}

function getLibrary(provider) {
  return new Web3(provider)
}


function App() {

  return (
    // <Web3ReactProvider getLibrary={getLibrary}>
    //   <InnerApp />
    // </Web3ReactProvider>
    <WrappedWeb3ReactProvider>
      <InnerApp />
      </WrappedWeb3ReactProvider>
  )
}

// const rootElement = document.getElementById('root')
// ReactDOM.render(<Example />, rootElement)

export default App;
