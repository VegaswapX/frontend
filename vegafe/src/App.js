import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Container, Navbar, Nav , Button} from 'react-bootstrap'
import './styles.css'

import Web3 from "web3";
import { Web3ReactProvider } from '@web3-react/core'


import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core"


export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337],
})

export const getEthereum = async () => {

  // event listener is not reliable
  while (document.readyState !== "complete") {
      await new Promise(resolve => setTimeout(resolve, 100))
  }

  return window.ethereum

}

export const getWeb3 = async () => {

    const ethereum = await getEthereum()
    let web3

    if (ethereum) {
        web3 = new Web3(ethereum)
    } else if (window.web3) {
        web3 = window.web3
    } else {
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
      <p>
        VGA balance
        USDT balance
        Pool balance

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


const routes = [
  { path: '/', name: 'BoostPools', Component: BoostPools },
  { path: '/about', name: 'About', Component: About }
]

function InnerApp() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

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
                    <Component />

                    <div className="flex flex-col items-center justify-center">
                    {active ? <span>Account: <b>{account}</b></span> : <span>Not connected</span>}
                    <Button onClick={connect}  variant="primary">Connect to MetaMask</Button>{' '}
                    <Button onClick={disconnect}  variant="info">Disconnect</Button>{' '}
                    
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
    <Web3ReactProvider getLibrary={getLibrary}>
      <InnerApp />
    </Web3ReactProvider>
  )

}

// const rootElement = document.getElementById('root')
// ReactDOM.render(<Example />, rootElement)

export default App;
