// @flow
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import SimpleBar from "simplebar-react";

// actions
import { hideRightSidebar } from "../redux/actions";

const RightSideBar = (props) => {
  const dispatch = useDispatch();

  const rightBarNodeRef = useRef(null);

  RightSideBar.defaultProps = {
    title: "Settings",
  };

  const title = props.title;
  const component = props.children || null;

  /**
   * Handles the close
   */
  const handleClose = (e) => {
    e.preventDefault();
    dispatch(hideRightSidebar());
  };

  /**
   * Handle the click anywhere in doc
   */
  const handleOtherClick = (e) => {
    if (
      rightBarNodeRef
      && rightBarNodeRef.current
      && rightBarNodeRef.current.contains(e.target)
    ) {
      return;
    } // else hide the right sidebar
    else dispatch(hideRightSidebar());
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOtherClick, false);
    return () => {
      document.removeEventListener("mousedown", handleOtherClick, false);
    };
  });

  return (
    <React.Fragment>
      <div className="end-bar" ref={rightBarNodeRef}>
        <div className="rightbar-title">
          <Link
            to="#"
            className="end-bar-toggle float-end"
            onClick={handleClose}
          >
            <i className="dripicons-cross noti-icon"></i>
          </Link>
          <h5 className="m-0">{title}</h5>
        </div>

        <SimpleBar
          style={{ maxHeight: "100%", zIndex: 10000 }}
          timeout={500}
          scrollbarMaxSize={320}
        >
          <div className="rightbar-content h-100">{component}</div>
        </SimpleBar>
      </div>

      <div className="rightbar-overlay"></div>
    </React.Fragment>
  );
};

export default RightSideBar;
