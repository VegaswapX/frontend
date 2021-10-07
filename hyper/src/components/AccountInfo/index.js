// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../eth.js";

import {
    Button
  } from "react-bootstrap";

// get the languages
const Languages = [
    {
        name: 'English'        
    }    
];

const AccountInfo = (): React$Element<any> => {
    const enLang = Languages[0] || {};
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { account, activate, deactivate } = useWeb3React();

    /*
     * toggle language-dropdown
     */
    const toggleDropdown = ({ dropdownOpen: boolean }) => {
        console.log("toggleDropdown")
        // setDropdownOpen(!dropdownOpen);
    };

    async function connect() {
        try {
          await activate(injected);
        } catch (ex) {
          console.log(ex);
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
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
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
