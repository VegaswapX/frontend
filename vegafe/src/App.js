import React from 'react'
import { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Container, Navbar, Nav , Button, Row, Col, Card} from 'react-bootstrap'
import './styles.css'

import { useWeb3React } from "@web3-react/core"
// import { formatEther } from '@ethersproject/units'

import WrappedWeb3ReactProvider from './WrappedWeb3ReactProvider';
import {injected} from './eth.js'
import {Balance, Vgabalance} from './Balance.js'

import {PoolStake} from "./Pool";

const routes = [
  { path: '/', name: 'BoostPools', Component: BoostPools },
  { path: '/mining', name: 'LiquidityMining', Component: LiquidityMining },
  { path: '/about', name: 'About', Component: About }
]


const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};


function BoostPools() {

  // const { value, bind, reset } = useInput('');
  const { value } = useInput('');

  
  
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
        <br />
        <Vgabalance/>
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
      Balance in the pool<br />
      % of total staked<br />
      time info<br />
      
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
      <Card.Title>Stake</Card.Title>
      <Card.Text>
      
     

    <PoolStake />
      </Card.Text>
      {/* <Button variant="primary">Go somewhere</Button> */}
    </Card.Body>
    </Card>
    </Col>
    

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



function InnerApp() {
  const { active, account, activate, deactivate } = useWeb3React()
  
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
        <Container className="container" style={{marginTop : '15px'}}>
        
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


function App() {

  return (
    
    <WrappedWeb3ReactProvider>
      <InnerApp />
      </WrappedWeb3ReactProvider>
  )
}


export default App;
