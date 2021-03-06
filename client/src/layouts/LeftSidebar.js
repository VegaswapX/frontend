// @flow
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

// components

import logoDark from "../assets/images/logo-dark.png";
// import logo from '../assets/images/logo.png';
import logo from "../assets/images/logo_black.jpeg";
import profileImg from "../assets/images/users/avatar-1.jpg";

/* sidebar content */
const SideBarContent = ({ hideUserProfile }) => {
  return (
    <>
      {!hideUserProfile && (
        <div className="leftbar-user">
          <Link to="/">
            <img
              src={profileImg}
              alt=""
              height="42"
              className="rounded-circle shadow-sm"
            />
            <span className="leftbar-user-name">Dominic Keller</span>
          </Link>
        </div>
      )}

      <div className="clearfix" />
    </>
  );
};

type LeftSidebarProps = {
  hideLogo: boolean,
  hideUserProfile: boolean,
  isLight: boolean,
  isCondensed: boolean,
};

const LeftSidebar = ({
  isCondensed,
  isLight,
  hideLogo,
  hideUserProfile,
}: LeftSidebarProps): React$Element<any> => {
  const menuNodeRef: any = useRef(null);

  /**
   * Handle the click anywhere in doc
   */
  const handleOtherClick = (e: any) => {
    if (
      menuNodeRef &&
      menuNodeRef.current &&
      menuNodeRef.current.contains(e.target)
    )
      return;
    // else hide the menubar
    if (document.body) {
      document.body.classList.remove("sidebar-enable");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOtherClick, false);

    return () => {
      document.removeEventListener("mousedown", handleOtherClick, false);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="leftside-menu" ref={menuNodeRef}>
        {!hideLogo && (
          <React.Fragment>
            <Link to="/" className="logo text-center logo-light">
              <span className="logo-lg">
                {/* <div style={{color: "white", marginTop: "0px", whitespace: "break-spaces"}}>Vegaswap</div> */}
                <img
                  src={isLight ? logoDark : logo}
                  alt="logo"
                  height="40"
                  style={{ marginTop: "10px", float: "center" }}
                />
              </span>
              <span className="logo-sm">
                {/* <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="16" /> */}
              </span>
            </Link>

            <Link to="/" className="logo text-center logo-dark">
              <span className="logo-lg">
                {/* <img src={isLight ? logoDark : logo} alt="logo" height="16" /> */}
              </span>
              <span className="logo-sm">
                {/* <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="16" /> */}
              </span>
            </Link>
          </React.Fragment>
        )}

        {!isCondensed && (
          <SimpleBar
            timeout={500}
            scrollbarMaxSize={320}
            style={{ marginTop: "10px", maxHeight: "100%" }}
          >
            <SideBarContent
              menuClickHandler={() => {}}
              isLight={isLight}
              hideUserProfile={hideUserProfile}
            />
          </SimpleBar>
        )}
        {isCondensed && (
          <SideBarContent isLight={isLight} hideUserProfile={hideUserProfile} />
        )}
      </div>
    </React.Fragment>
  );
};

LeftSidebar.defaultProps = {
  hideLogo: false,
  hideUserProfile: false,
  isLight: false,
  isCondensed: false,
};

export default LeftSidebar;
