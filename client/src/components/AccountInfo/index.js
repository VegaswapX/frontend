// @flow
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../chain/eth.js";

import {
    Button
  } from "react-bootstrap";



const AccountInfo = (): React$Element<any> => {
    const [dropdownOpen] = useState(false);

    // const { activate, deactivate } = useWeb3React();    
    const { activate } = useWeb3React();    

    async function connect() {
        try {
          await activate(injected);
        } catch (ex) {
          console.log(ex);
        }
      }
    
    //   async function disconnect() {
    //     try {
    //       deactivate();
    //     } catch (ex) {
    //       console.log(ex);
    //     }
    //   }

    return (
        <Dropdown show={dropdownOpen}>
            {/* <Dropdown.Toggle
                variant="link"
                id="dropdown-languages"
                as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle arrow-none">                
                <span className="align-middle d-none d-sm-inline-block">{enLang.name}</span>
                
            </Dropdown.Toggle> */}
            <Button onClick={connect} variant="primary">
                    Connect
                  </Button>

            {/* <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu">

                <div onClick={toggleDropdown}>
                    
                </div>
            </Dropdown.Menu> */}
        </Dropdown>
    );
};

export default AccountInfo;
