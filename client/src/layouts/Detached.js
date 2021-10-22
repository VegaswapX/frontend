// @flow
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

// actions
import { changeLayout } from "../redux/actions";

import * as layoutConstants from "../constants/layout";

// components

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import("./Topbar"));
const RightSidebar = React.lazy(() => import("./RightSidebar"));

const loading = () => <div className="text-center"></div>;

const DetachedLayout = ({ children }, state) => {
  const dispatch = useDispatch();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = (e) => {
    setIsMenuOpened((prevState) => {
      setIsMenuOpened(!prevState);
    });
    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.add("sidebar-enable");
      } else {
        document.body.classList.remove("sidebar-enable");
      }
    }
  };

  useEffect(() => {
    dispatch(changeLayout(layoutConstants.LAYOUT_DETACHED));
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={loading()}>
        <Topbar
          isMenuOpened={isMenuOpened}
          openLeftMenuCallBack={openMenu}
          navCssClasses="topnav-navbar topnav-navbar-dark"
          topbarDark={true}
        />
      </Suspense>
      <Container fluid>
        <div className="wrapper">
          {/* <Suspense fallback={loading()}>
                        <LeftSidebar
                            isMenuOpened={isMenuOpened}
                            isCondensed={isCondensed}
                            isLight={isLight}
                            hideLogo={true}
                            hideUserProfile={true}
                        />
                    </Suspense> */}

          <div className="content-page" style={{ marginTop: "20px" }}>
            <div className="content">
              <Suspense fallback={loading()}>{children}</Suspense>
            </div>

            {/* <Suspense fallback={loading()}>
                            
                        </Suspense> */}
          </div>
        </div>
      </Container>
      <Suspense fallback={loading()}>
        <RightSidebar>{/* <ThemeCustomizer /> */}</RightSidebar>
      </Suspense>
    </>
  );
};

export default DetachedLayout;
