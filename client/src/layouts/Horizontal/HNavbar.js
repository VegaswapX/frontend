// @flow
import React from 'react';
import AppMenu from './Menu';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';

import { getMenuItems } from '../../helpers/menu';

type NavbarProps = {
    isMenuOpened?: boolean,
};

const HNavbar = (props: NavbarProps): React$Element<React$FragmentType> => {
    // change the inputTheme value to light for creative theme
    const inputTheme = 'dark';

    return (
        <React.Fragment>
            <div className="topnav">
                <div className="container-fluid">
                <h1>Navbar</h1>
                    {/* // <nav className={classNames('navbar', 'navbar-expand-lg', 'topnav-menu', 'navbar-' + inputTheme)}>
                    //     <Collapse in={props.isMenuOpened} className="navbar-collapse" id="topnav-menu-content">
                    //         <div>
                    //             <AppMenu menuItems={getMenuItems()} />
                    //         </div>
                    //     </Collapse>
                    // </nav> */}
                </div>
            </div>
        </React.Fragment>
    );
};

export default HNavbar;
