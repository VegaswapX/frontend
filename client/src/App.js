// @flow
import React from 'react';
import Routes from './routes/Routes';

import WrappedWeb3ReactProvider from "./chain/WrappedWeb3ReactProvider";
import Web3ConnectionManager from "./chain/Web3ConnectionManager";


// setup fake backend
// import { configureFakeBackend } from './helpers';

// Themes

// For Saas import Saas.scss
// import './assets/scss/Saas.scss';
// For Dark import Saas-Dark.scss
// import './assets/scss/Saas-Dark.scss';

// For Modern demo import Modern.scss
// import './assets/scss/Modern.scss';
// For Modern dark demo import Modern-Dark.scss
// import './assets/scss/Modern-Dark.scss';

// For Creative demo import Creative.scss
// import './assets/scss/Creative.scss';
// For Creative dark demo import Creative-Dark.scss
import './assets/scss/Creative-Dark.scss';

// configure fake backend
// configureFakeBackend();


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
          <InnerApp />
        </Web3ConnectionManager>
      </WrappedWeb3ReactProvider>
    );
  }

export default App;
