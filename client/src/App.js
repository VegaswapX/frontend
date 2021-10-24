// @flow
import React from 'react';
import Routes from './routes/Routes';

import {WrappedWeb3ReactProvider, Web3ConnectionManager} from "./chain/eth";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './assets/scss/Creative-Dark.scss';


/**
 * Main app component
 */
const InnerApp = () => {
    return <Routes/>;
};

function App() {
    return (
      <WrappedWeb3ReactProvider>
        <Web3ConnectionManager>
          <ToastContainer/>
          <InnerApp />
        </Web3ConnectionManager>
      </WrappedWeb3ReactProvider>
    );
  }

export default App;
