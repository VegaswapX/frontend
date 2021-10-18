/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../chain/eth.js";

// actions
import { showRightSidebar } from '../redux/actions';

// components
import logoSmDark from '../assets/images/logo_sm_dark.png';
import logoSmLight from '../assets/images/logo_sm.png';
import logo from '../assets/images/logo-light.png';
import vlogo from '../assets/images/logo_black.jpeg'

//constants
import * as layoutConstants from '../constants/layout';

import {
    Button
  } from "react-bootstrap";
// get the notifications



const AccountConnect = () => {

    const { account, activate, deactivate } = useWeb3React();

    const [networkOk, setNetworkOk] = React.useState();

    async function connect() {
        await activate(injected, async (error) => {
            if (error instanceof UnsupportedChainIdError) {
                console.log("error UnsupportedChainIdError");
                alert("error UnsupportedChainIdError");
                setNetworkOk(false);
                // const hasSetup = await setupNetwork()
                // if (hasSetup) {
                //     activate(injected)
                // }
            }
        });
    }
  
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
          if (networkOk){
            console.log("account" + account);
            return (<Button onClick={disconnect} variant="info" style={{marginTop: "22%"}}>
            Disconnect
            </Button>) 
          } else {            
            return (<Button onClick={disconnect} variant="danger" style={{marginTop: "22%"}}>
            Wrong network
            </Button>) 
          }
      }
      else {        
          return (<Button onClick={connect} variant="primary" style={{marginTop: "22%"}}>
          Connect
          </Button>)
          }
   }

   return connectButton();   

}

const AccountInfo = () => {

    const { account, activate, deactivate } = useWeb3React();

    function accInfo() {
        if (account){
           return ( 
           <div style={{marginTop: "18%", marginRight: "10px", fontSize: "18px"}}>
            Account: <b>{account.substring(0, 3)}..{account.substring(account.length-3, account.length)}</b>
            </div>)
        } else {
            return <span></span>
        }
    }

    return accInfo();    
}

const AccountManage = () => {

    return (
        <span>                                
          <li className="">
            <AccountInfo />
          </li>
          <li className="">
            <AccountConnect />                            
          </li>
        </span>
    )
}


const Topbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack, topbarDark }) => {
    const dispatch = useDispatch();

    // const [isopen, setIsopen] = useState(false);

    const { account, activate, deactivate } = useWeb3React();

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
                <div className={containerCssClasses}>
                    {!hideLogo && (
                        <Link to="/" className="topnav-logo">
                            <span className="">
                                <img src={vlogo} alt="logo" height="50" style={{marginTop: "10px"}}/>
                                <span style={{color: "white", marginLeft: "20px", marginTop: "10px", fontSize: "20px"}}>Vegaswap</span>
                            </span>                            
                        </Link>
                    )}

                    <ul className="list-unstyled topbar-menu float-end mb-0">
                        {/* <li className="notification-list topbar-dropdown d-xl-none">
                            <SearchDropdown />
                        </li>

                        <li className="dropdown notification-list topbar-dropdown d-none d-lg-block">
                            <AccountInfo />
                        </li>
                                              
                        <li className="dropdown notification-list topbar-dropdown d-none d-lg-block">
                            <LanguageDropdown />
                        </li> */}
                        {/* <li className="dropdown notification-list">
                            <NotificationDropdown notifications={Notifications} />
                        </li> */}
                        {/* <li className="dropdown notification-list topbar-dropdown d-none d-lg-block"> */}

                        <li className="">
                            
                        </li>
                        
                        <li className="">
                            <AccountManage />
                        </li>

                        {/* <li className="dropdown notification-list d-none d-sm-inline-block">
                            <AppsDropdown />
                        </li> */}
                        <li className="notification-list">
                            <button
                                className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
                                onClick={handleRightSideBar}>
                                <i className="dripicons-gear noti-icon"></i>
                            </button>
                        </li>
                        {/* <li className="dropdown notification-list">
                            <ProfileDropdown
                                profilePic={profilePic}
                                menuItems={ProfileMenus}
                                username={account}
                                userTitle={'Connect'}
                            />
                        </li> */}
                    </ul>

                    {/* toggle for vertical layout */}
                    {/* {layoutType === layoutConstants.LAYOUT_VERTICAL && (
                        <button className="button-menu-mobile open-left disable-btn" onClick={handleLeftMenuCallBack}>
                            <i className="mdi mdi-menu" />
                        </button>
                    )} */}

                    {/* toggle for horizontal layout */}
                    {/* {layoutType === layoutConstants.LAYOUT_HORIZONTAL && (
                        <Link
                            to="#"
                            className={classNames('navbar-toggle', { open: isopen })}
                            onClick={handleLeftMenuCallBack}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    )} */}

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
                    {/* <TopbarSearch items={SearchResults} /> */}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Topbar;
