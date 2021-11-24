/* @flow */
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import { injectedConnector } from "../chain/eth.js";
import { store } from "../redux/store";

// actions
// import { showRightSidebar } from "../redux/actions";
import vlogo from "../assets/images/Horizontal_White.png";
import blackLogoSVG from "../assets/images/logos/black_bg.svg";

// constants
import * as layoutConstants from "../constants/layout";

import { Button } from "react-bootstrap";
import NetworkSwitchButton from "../components/Buttons/NetworSwitchButton";
import "./nav.css";

// get the notifications

const AccountConnect = ({ connect }) => {
  const { account, activate, deactivate } = useWeb3React();

  let state = store.getState();
  let connected = state.web3Reducer.connected; // unused var

  async function disconnect() {
    try {
      deactivate();
    } catch (e) {
      console.log("Failed to disconnect", e);
    }
  }

  const buttonText = !!account ? "Disconnect" : "Connect";
  const buttonHandler = !!account ? disconnect : connect;

  return (
    <Button onClick={buttonHandler} variant="primary" style={{ width: "105px" }}>
      {buttonText}
    </Button>
  );
};

const AccountInfo = () => {
  const { account } = useWeb3React();

  // if (store.state != undefined){
  //   //  console.log(">>>> store " + store.state.connected);
  //   //  alert("store " + store.state.connected);

  // //   if (store.state.connected)
  // } else {
  //   //alert("no state " + store.state)
  // }

  // if (store.state){
  //   if (store.state.account == "" && store.state.connected){
  //       console.log("!SET ")
  //       store.dispatch({ type: "web3/switchConnected", payload: account }); //, payload: "x"
  //   }
  // }

  if (account) {
    return (
        <div style={{ fontSize: "18px", marginRight: "16px" }}>
          Account:{" "}
          <b>
            {account.substring(0, 3)}..
            {account.substring(account.length - 3, account.length)}
          </b>
        </div>
    );
  }

  return <span />;
};

// TODO: Change account to wallet connect
const AccountManage = () => {
  const [networkStatus, setNetworkStatus] = useState(true);
  const { activate } = useWeb3React();

  // console.log("networkStatus " + networkStatus);

  async function connect() {
    await activate(injectedConnector, async (error) => {
      if (error instanceof UnsupportedChainIdError) {
        setNetworkStatus();
        // const hasSetup = await setupNetwork()
        // if (hasSetup) {
        //     activate(injected)
        // }
      }
    });
  }

  if (networkStatus) {
    return (
      <>
        <AccountInfo />
        <NetworkSwitchButton />
        <AccountConnect connect={connect} />
      </>
    );
  } else {
    return (
      <Button variant={"danger"} disabled>
        Wrong Network
      </Button>
    );
  }
};

// TODO: Image is not optimized for mobile
const Brand = () => {
  return (
    <Navbar.Brand href="#home">
      <span className="navbar-logo">
        <img
          src={vlogo}
          alt="logo"
          width="210"
          height="110"
        />
      </span>
    </Navbar.Brand>
  );
};

const links = [
  {
    link: "/swap",
    icon: <i className="uil-exchange"></i>,
    text: "Swap",
  },
  {
    link: "/boost",
    icon: <i className="dripicons-rocket"></i>,
    text: "Farming",
  },
];

// TODO: Custom font-size breaks the UI
const VerticalMenu = () => {
  return (
    <Navbar bg="" expand="lg">
      <Container>
        <Brand />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {links.map(x => {
              return (
                <Nav.Link href={x.link} key={x.link}>
                  {x.icon}
                  <span>{x.text}</span>
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const Topbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack }) => {
  // const dispatch = useDispatch();

  // const [isopen, setIsopen] = useState(false);

  const navbarCssClasses = navCssClasses || "";
  const containerCssClasses = !hideLogo ? "container-fluid" : "";

  const { layoutType } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
  }));

  /**
   * Toggle the leftmenu when having mobile screen
   */
  const handleLeftMenuCallBack = () => {
    // setIsopen((prevState) => !prevState);
    if (openLeftMenuCallBack) openLeftMenuCallBack();
  };

  /**
   * Toggles the right sidebar
   */
  // const handleRightSideBar = () => {
  //   dispatch(showRightSidebar());
  // };

  // const handleConnect = () => {
  //     console.log("connect")
  //     connect();
  // };

  return (
    <React.Fragment>
      <div className={`navbar-custom ${navbarCssClasses}`}>
        <div
          className={`${containerCssClasses} h-100 d-flex justify-content-between`}
        >
          <VerticalMenu />

          <ul className="list-unstyled topbar-menu float-end mb-0 d-flex align-items-center">
            <AccountManage />
          </ul>

          {/* toggle for detached layout */}
          {/*{layoutType === layoutConstants.LAYOUT_DETACHED && (*/}
          {/*  <Link*/}
          {/*    to="#"*/}
          {/*    className="button-menu-mobile disable-btn"*/}
          {/*    onClick={handleLeftMenuCallBack}*/}
          {/*  >*/}
          {/*    <div className="lines">*/}
          {/*      <span></span>*/}
          {/*      <span></span>*/}
          {/*      <span></span>*/}
          {/*    </div>*/}
          {/*  </Link>*/}
          {/*)}*/}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
