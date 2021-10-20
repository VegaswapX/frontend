/* @flow */
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../chain/eth.js";
import { Navbar, Nav, Container } from 'react-bootstrap';

// actions
import { showRightSidebar } from '../redux/actions';

// components
import vlogo from '../assets/images/logo_black.jpeg'

//constants
import * as layoutConstants from '../constants/layout';

import {
    Button
  } from "react-bootstrap";
import NetworkSwitchButton from "../components/Buttons/NetworSwitchButton";

// get the notifications

const AccountConnect = ({ connect }) => {

    const { account, deactivate } = useWeb3React();

    // async function connect() {
    //     await activate(injected, async (error) => {
    //         if (error instanceof UnsupportedChainIdError) {
    //             console.log("error UnsupportedChainIdError");
    //             alert("error UnsupportedChainIdError");
    //             setNetworkOk(false);
    //             // const hasSetup = await setupNetwork()
    //             // if (hasSetup) {
    //             //     activate(injected)
    //             // }
    //         } else {
    //             setNetworkOk(true);
    //         }
    //     });
    // }
  
    async function disconnect() {
        console.log("disconnect")
      try {
        deactivate();
      } catch (ex) {
        console.log(ex);
      }
    }

    function connectButton () {         
      if (account) {
          console.log("account" + account);
          return (<Button onClick={disconnect} variant="info">
          Disconnect
          </Button>) 
      }
      else {        
          return (<Button onClick={connect} variant="primary">
          Connect
          </Button>)
          }
   }

   return connectButton();   

}

const AccountInfo = () => {

    const { account } = useWeb3React();

    function accInfo() {
        if (account){
           return ( 
           <div style={{fontSize: "18px", marginRight: "16px"}}>
            Account: <b>{account.substring(0, 3)}..{account.substring(account.length-3, account.length)}</b>
            </div>)
        } else {
            return <span/>
        }
    }

    return accInfo();    
}

const AccountManage = () => {
    const [networkStatus, setNetworkStatus] = useState(true)
    const { activate } = useWeb3React()

    console.log("networkStatus " + networkStatus);

    async function connect() {
        await activate(injected, async (error) => {
            if (error instanceof UnsupportedChainIdError) {
                setNetworkStatus()
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
              <NetworkSwitchButton />
              <AccountInfo />              
              <AccountConnect connect={connect} />
          </>
      )
    } else {
        return (
            <Button variant={"danger"} disabled>Wrong Network</Button>
        )
    }
}


const Topbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack, topbarDark }) => {
    const dispatch = useDispatch();

    // const [isopen, setIsopen] = useState(false);

    const navbarCssClasses = navCssClasses || '';
    const containerCssClasses = !hideLogo ? 'container-fluid' : '';

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
    const handleRightSideBar = () => {
        dispatch(showRightSidebar());
    };

    // const handleConnect = () => {
    //     console.log("connect")
    //     connect();
    // };

    

    return (
        <React.Fragment>
            <div className={`navbar-custom ${navbarCssClasses}`}>
                <div className={`${containerCssClasses} h-100 d-flex justify-content-between`}>

                <Navbar bg="" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">
                        <span className="">
                                <img src={vlogo} alt="logo" height="50" style={{marginTop: "0px"}}/>
                                <span style={{color: "white", marginLeft: "10px", marginTop: "0px", fontSize: "20px"}}>Vegaswap</span>
                        </span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{fontSize: "20px"}}>
                            {/* <Nav.Link href="#home">Dashboard</Nav.Link> */}
                            <Nav.Link href="/swap">                            
                            <i className="uil-exchange"></i>
                                Swap
                            </Nav.Link>
                            <Nav.Link href="/boost"><i className="dripicons-rocket"></i> Farming</Nav.Link>
                            <Nav.Link href="/liq"><i className="uil-layer-group"></i> Liquidity</Nav.Link>

                            
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                   
                    <ul className="list-unstyled topbar-menu float-end mb-0 d-flex align-items-center">

                        <AccountManage />
                        
                        <Button
                            className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
                            size="lg"
                            variant={"outline-light"}
                            onClick={handleRightSideBar}>
                            <i className="dripicons-gear noti-icon" />
                        </Button>
                        
                    </ul>

                    
                    {/* toggle for detached layout */}
                    {layoutType === layoutConstants.LAYOUT_DETACHED && (
                        <Link to="#" className="button-menu-mobile disable-btn" onClick={handleLeftMenuCallBack}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Topbar;
