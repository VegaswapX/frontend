import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SwapPage from '../pages/Swap';
import {createBoostPoolPage} from '../pages/Boost';
import LiqPage from '../pages/vega/Liq';
import TxPage from '../pages/vega/Tx';

// import Route from './Route';

// lazy load all the views


// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/boost" />,
    route: Route,
};

// TODO: Generate routes based on list of tokens

// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboards',
    icon: 'uil-home-alt',
    header: 'Navigation',
    children: [            
        {
            path: '/boost',
            name: 'Boost',
            component: createBoostPoolPage({poolName: "USDT"}),
            route: Route,
        },
        {
            path: '/boostvga',
            name: 'Boost',
            component: createBoostPoolPage({poolName: "VGA"}),
            route: Route,
        },
        {
            path: '/liq',
            name: 'Liq',
            component: LiqPage,
            route: Route,
        },
        {
            path: '/swap',
            name: 'Swap',
            component: SwapPage,
            route: Route,
        },
        {
            path: '/tx',
            name: 'Tx',
            component: TxPage,
            route: Route,
        },
        
        
    ],
};


// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};


// All routes
const authProtectedRoutes = [rootRoute, dashboardRoutes];
const publicRoutes = [];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);

export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
