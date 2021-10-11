// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../chain/eth.js";

// actions
import { showRightSidebar } from '../redux/actions';

// components
import logoSmDark from '../assets/images/logo_sm_dark.png';
import logoSmLight from '../assets/images/logo_sm.png';
import logo from '../assets/images/logo-light.png';

//constants
import * as layoutConstants from '../constants/layout';

import {
    Button
  } from "react-bootstrap";
import { setupNetwork } from "../utils/wallet";
// get the notifications


type TopbarProps = {
    hideLogo?: boolean,
    navCssClasses?: string,
    openLeftMenuCallBack?: () => void,
    topbarDark?: boolean,
};

const Topbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack, topbarDark }: TopbarProps): React$Element<any> => {
    const dispatch = useDispatch();

    const [isopen, setIsopen] = useState(false);

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
        setIsopen((prevState) => !prevState);
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

    async function connect() {
        const hasSetup = await setupNetwork()
        try {
          await activate(injected);
        } catch (error) {
                if (hasSetup) {
                    activate(injected)
            }
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
        <React.Fragment>
            <div className={`navbar-custom ${navbarCssClasses}`}>
                <div className={containerCssClasses}>
                    {!hideLogo && (
                        <Link to="/" className="topnav-logo">
                            <span className="topnav-logo-lg">
                                <img src={logo} alt="logo" height="16" />
                            </span>
                            <span className="topnav-logo-sm">
                                <img src={topbarDark ? logoSmLight : logoSmDark} alt="logo" height="16" />
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
                        <li className="dropdown notification-list topbar-dropdown d-none d-lg-block">
                        {account ? (
                                <div style={{marginTop: "23px", marginRight: "10px"}}>
                                Account: <b>{account}</b>
                                </div>
                            ) : (
                                <span></span>
                            )}    
                        </li>

                        <li className="dropdown notification-list d-lg-block">
                            {/* <button
                                className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
                                onClick={handleConnect}>
                                    connect                                
                            </button> */}

            
                        <span>
                            {account ?
                                (<Button onClick={disconnect} variant="info" style={{marginTop: "15px"}}>
                                    Disconnect
                                </Button>)
                                :
                                (<Button onClick={connect} variant="primary" style={{marginTop: "15px"}}>
                                    Connect
                                </Button>)
                            }
                        </span>
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
                    {layoutType === layoutConstants.LAYOUT_VERTICAL && (
                        <button className="button-menu-mobile open-left disable-btn" onClick={handleLeftMenuCallBack}>
                            <i className="mdi mdi-menu" />
                        </button>
                    )}

                    {/* toggle for horizontal layout */}
                    {layoutType === layoutConstants.LAYOUT_HORIZONTAL && (
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
                    )}

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
