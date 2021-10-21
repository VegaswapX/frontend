// @flow
import React from "react";
import { Row, Col } from "react-bootstrap";
import Balances from "../Boost/Balances";
// components
// import PageTitle from '../../components/PageTitle';
import classNames from "classnames";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styled from 'styled-components';
import { Card } from "react-bootstrap";

import POOL_CONTRACT_ABI from "./../../abis/BoostPool.json";
import { POOL1 } from "../../chain/Contracts";

const DashboardPage1 = () => {

  return () => {
    return (
      <>
        
       
        {/* <Balances /> */}
        
      </>
    );
  };
};

const DashboardPage = () => {
  return (
      <React.Fragment>
          
          
          <Balances />
          
          
      </React.Fragment>
  );
};

export { DashboardPage };
