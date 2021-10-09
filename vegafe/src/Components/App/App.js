import React from "react";
// import { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "../../style/styles.css";

import { useWeb3React } from "@web3-react/core";
// import { formatEther } from '@ethersproject/units'

import WrappedWeb3ReactProvider from "../../web3/WrappedWeb3ReactProvider";
import { injected } from "../../web3/eth.js";
import { Balance, Vgabalance } from "../Balance/Balance.js";

import { PoolStake, PoolInfo } from "../Pools/Pool";
import Web3ConnectionManager from "../../web3/Web3ConnectionManager";

const routes = [
  { path: "/", name: "BoostPools", Component: BoostPools },
  { path: "/mining", name: "LiquidityMining", Component: LiquidityMining },
  { path: "/about", name: "About", Component: About },
];

// const useInput = initialValue => {
//   const [value, setValue] = useState(initialValue);

//   return {
//     value,
//     setValue,
//     reset: () => setValue(""),
//     bind: {
//       value,
//       onChange: event => {
//         setValue(event.target.value);
//       }
//     }
//   };
// };

function BoostPools() {
  // const { value, bind, reset } = useInput('');
  // const { value } = useInput('');

  return (
    <>
      <h1 className="text-center mb-5">BoostPools</h1>
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "18rem", height: "100%" }}>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Header>Balances</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Balance />
                  <br />
                  <Vgabalance />
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem", height: "100%" }}>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Header>Pool Info</Card.Header>
              <Card.Body className={"p-0"}>
                <PoolInfo />
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem", height: "100%" }}>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Header>Stake</Card.Header>
              <Card.Body>
                <PoolStake />
                {/* <Card.Text>
                        </Card.Text> */}
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function LiquidityMining() {
  return (
    <>
      <h1>LiquidityMining</h1>
      <p>google form</p>
    </>
  );
}

function About() {
  return (
    <>
      <h1>About</h1>
      <p>Info</p>
    </>
  );
}

function InnerApp() {
  const { account, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <Router>
      <>
        <Navbar bg="dark" variant="dark" className="ml-auto">
          <Nav className="mx-auto">
            <Navbar.Brand href="#home">Vegaswap</Navbar.Brand>
            {routes.map((route) => (
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
            <Nav.Link disabled className={"d-flex align-items-center"}>
              {account ? (
                <span>
                  Account: <b>{account}</b>
                </span>
              ) : (
                <span>Not connected</span>
              )}
            </Nav.Link>
            <Nav.Link className={"nav-right"}>
              {account ?
                  (<Button onClick={disconnect} variant="info">
                    Disconnect
                  </Button>)
                  :
                  (<Button onClick={connect} variant="primary">
                    Connect
                  </Button>)
              }
            </Nav.Link>
          </Nav>
        </Navbar>
        <Container className="container" style={{ marginTop: "15px" }}>
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
  );
}

function App() {
  return (
    <WrappedWeb3ReactProvider>
      <Web3ConnectionManager>
        <InnerApp />
      </Web3ConnectionManager>
    </WrappedWeb3ReactProvider>
  );
}

export default App;
