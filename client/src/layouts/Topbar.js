/* @flow */
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import React, {useState, useCallback} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useSelector} from "react-redux";
import {injectedConnector} from "../chain/eth.js";
import {store} from "../redux/store";

// actions
// import { showRightSidebar } from "../redux/actions";
import vlogo from "../assets/images/Horizontal_White.png";

// constants
import NetworkSwitchButton from "../components/Buttons/NetworSwitchButton";
import "./nav.css";

// TODO: Rewrite this to a proper useAuth to support metamask and walletconnect

// get the notifications
const AccountConnect = () => {
  const { account, activate, deactivate } = useWeb3React();

  const connect = useCallback(async () => {
    await activate(injectedConnector, async (error) => {
      if (error instanceof UnsupportedChainIdError) {
        // setNetworkStatus(); // set network status later
      }
    });
  }, [activate])

  // refactor this to a hook
  const logout = useCallback(() => {
    try {
      // remove other things
      deactivate();
    } catch (e) {
      console.log("Failed to disconnect", e);
    }
  }, [deactivate])


  const buttonText = !!account ? "Disconnect" : "Connect";
  const buttonHandler = !!account ? logout : connect;

  return (
    <Button onClick={buttonHandler} variant="primary">
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
    const shortAccountAddress = account.substring(0, 3) + account.substring(account.length - 3, account.length)
    return (
        <div>
          Account:{" "}{shortAccountAddress}
        </div>
    );
  }

  return <span />;
};


// TODO: Change account to wallet connect
const AccountManage = () => {
  const [networkStatus, setNetworkStatus] = useState(true);

  // console.log("networkStatus " + networkStatus);


  if (networkStatus) {
    return (
      <>
        <AccountInfo />
        <NetworkSwitchButton />
        <AccountConnect/>
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
