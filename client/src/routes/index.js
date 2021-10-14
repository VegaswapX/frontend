import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SwapPage from '../pages/dashboard/Swap';
import BoostPage from '../pages/dashboard/Boost';
import BoostPageVGA from '../pages/dashboard/BoostVGA';
import LiqPage from '../pages/vega/Liq';
import TxPage from '../pages/vega/Tx';

// import Route from './Route';

// lazy load all the views


// dashboard

// pages

// uikit
const Accordions = React.lazy(() => import('../pages/uikit/Accordions'));
const Alerts = React.lazy(() => import('../pages/uikit/Alerts'));
const Avatars = React.lazy(() => import('../pages/uikit/Avatars'));
const Badges = React.lazy(() => import('../pages/uikit/Badges'));
const Breadcrumbs = React.lazy(() => import('../pages/uikit/Breadcrumb'));
const Buttons = React.lazy(() => import('../pages/uikit/Buttons'));
const Cards = React.lazy(() => import('../pages/uikit/Cards'));
const Carousels = React.lazy(() => import('../pages/uikit/Carousel'));
const Dropdowns = React.lazy(() => import('../pages/uikit/Dropdowns'));
const EmbedVideo = React.lazy(() => import('../pages/uikit/EmbedVideo'));
const Grid = React.lazy(() => import('../pages/uikit/Grid'));
const ListGroups = React.lazy(() => import('../pages/uikit/ListGroups'));
const Modals = React.lazy(() => import('../pages/uikit/Modals'));
const Notifications = React.lazy(() => import('../pages/uikit/Notifications'));
const Offcanvases = React.lazy(() => import('../pages/uikit/Offcanvas'));
const Paginations = React.lazy(() => import('../pages/uikit/Paginations'));
const Popovers = React.lazy(() => import('../pages/uikit/Popovers'));
const Progress = React.lazy(() => import('../pages/uikit/Progress'));
const Ribbons = React.lazy(() => import('../pages/uikit/Ribbons'));
const Spinners = React.lazy(() => import('../pages/uikit/Spinners'));
const Tabs = React.lazy(() => import('../pages/uikit/Tabs'));
const Tooltips = React.lazy(() => import('../pages/uikit/Tooltips'));
const Typography = React.lazy(() => import('../pages/uikit/Typography'));
const DragDrop = React.lazy(() => import('../pages/uikit/DragDrop'));
const RangeSliders = React.lazy(() => import('../pages/uikit/RangeSliders'));
const Ratings = React.lazy(() => import('../pages/uikit/Ratings'));

// icons
const Dripicons = React.lazy(() => import('../pages/uikit/Dripicons'));
const MDIIcons = React.lazy(() => import('../pages/uikit/MDIIcons'));
const Unicons = React.lazy(() => import('../pages/uikit/Unicons'));

// charts
const ApexChart = React.lazy(() => import('../pages/charts/Apex'));
const BriteChart = React.lazy(() => import('../pages/charts/Brite'));
const ChartJs = React.lazy(() => import('../pages/charts/ChartJs'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

// widgets
const Widgets = React.lazy(() => import('../pages/uikit/Widgets'));

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard/boost" />,
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
            path: '/dashboard/boost',
            name: 'Boost',
            component: BoostPage,
            route: Route,
        },
        {
            path: '/dashboard/boostvga',
            name: 'Boost',
            component: BoostPageVGA,
            route: Route,
        },
        {
            path: '/dashboard/liq',
            name: 'Liq',
            component: LiqPage,
            route: Route,
        },
        {
            path: '/dashboard/swap',
            name: 'Swap',
            component: SwapPage,
            route: Route,
        },
        {
            path: '/dashboard/tx',
            name: 'Tx',
            component: TxPage,
            route: Route,
        },
        
        
    ],
};




// ui
const uiRoutes = {
    path: '/ui',
    name: 'Components',
    icon: 'uil-package',
    header: 'UI Elements',
    children: [
        {
            path: '/ui/base',
            name: 'Base UI',
            children: [
                {
                    path: '/ui/accordions',
                    name: 'Accordions',
                    component: Accordions,
                    route: Route,
                },
                {
                    path: '/ui/alerts',
                    name: 'Alerts',
                    component: Alerts,
                    route: Route,
                },
                {
                    path: '/ui/avatars',
                    name: 'Avatars',
                    component: Avatars,
                    route: Route,
                },
                {
                    path: '/ui/badges',
                    name: 'Badges',
                    component: Badges,
                    route: Route,
                },
                {
                    path: '/ui/breadcrumb',
                    name: 'Breadcrumb',
                    component: Breadcrumbs,
                    route: Route,
                },
                {
                    path: '/ui/buttons',
                    name: 'Buttons',
                    component: Buttons,
                    route: Route,
                },
                {
                    path: '/ui/cards',
                    name: 'Cards',
                    component: Cards,
                    route: Route,
                },
                {
                    path: '/ui/carousel',
                    name: 'Carousel',
                    component: Carousels,
                    route: Route,
                },
                {
                    path: '/ui/dropdowns',
                    name: 'Dropdowns',
                    component: Dropdowns,
                    route: Route,
                },
                {
                    path: '/ui/embedvideo',
                    name: 'EmbedVideo',
                    component: EmbedVideo,
                    route: Route,
                },
                {
                    path: '/ui/grid',
                    name: 'Grid',
                    component: Grid,
                    route: Route,
                },
                {
                    path: '/ui/listgroups',
                    name: 'List Groups',
                    component: ListGroups,
                    route: Route,
                },
                {
                    path: '/ui/modals',
                    name: 'Modals',
                    component: Modals,
                    route: Route,
                },
                {
                    path: '/ui/notifications',
                    name: 'Notifications',
                    component: Notifications,
                    route: Route,
                },
                {
                    path: '/ui/offcanvas',
                    name: 'Offcanvas',
                    component: Offcanvases,
                    route: Route,
                },
                {
                    path: '/ui/paginations',
                    name: 'Paginations',
                    component: Paginations,
                    route: Route,
                },
                {
                    path: '/ui/popovers',
                    name: 'Popovers',
                    component: Popovers,
                    route: Route,
                },
                {
                    path: '/ui/progress',
                    name: 'Progress',
                    component: Progress,
                    route: Route,
                },
                {
                    path: '/ui/ribbons',
                    name: 'Ribbons',
                    component: Ribbons,
                    route: Route,
                },
                {
                    path: '/ui/spinners',
                    name: 'Spinners',
                    component: Spinners,
                    route: Route,
                },
                {
                    path: '/ui/tabs',
                    name: 'Tabs',
                    component: Tabs,
                    route: Route,
                },
                {
                    path: '/ui/tooltips',
                    name: 'Tooltips',
                    component: Tooltips,
                    route: Route,
                },
                {
                    path: '/ui/typography',
                    name: 'Typography',
                    component: Typography,
                    route: Route,
                },
            ],
        },
        {
            path: '/ui/extended',
            name: 'Extended UI',
            children: [
                {
                    path: '/ui/dragdrop',
                    name: 'Drag and Drop',
                    component: DragDrop,
                    route: Route,
                },
                {
                    path: '/ui/rangesliders',
                    name: 'Range Sliders',
                    component: RangeSliders,
                    route: Route,
                },
                {
                    path: '/ui/ratings',
                    name: 'Ratings',
                    component: Ratings,
                    route: Route,
                },
            ],
        },
        {
            path: '/ui/widgets',
            name: 'Widgets',
            component: Widgets,
            route: Route,
        },
        {
            path: '/ui/icons',
            name: 'Icons',
            children: [
                {
                    path: '/ui/icons/dripicons',
                    name: 'Dripicons',
                    component: Dripicons,
                    route: Route,
                },
                {
                    path: '/ui/icons/mdi',
                    name: 'Material Design',
                    component: MDIIcons,
                    route: Route,
                },
                {
                    path: '/ui/icons/unicons',
                    name: 'Unicons',
                    component: Unicons,
                    route: Route,
                },
            ],
        },        
        {
            path: '/ui/charts',
            name: 'Charts',
            children: [
                {
                    path: '/ui/charts/apex',
                    name: 'Apex',
                    component: ApexChart,
                    route: Route,
                },
                {
                    path: '/ui/charts/brite',
                    name: 'Brite',
                    component: BriteChart,
                    route: Route,
                },
                {
                    path: '/ui/charts/chartjs',
                    name: 'Chartjs',
                    component: ChartJs,
                    route: Route
                },
            ],
        },
        {
            path: '/ui/tables',
            name: 'Tables',
            children: [
                {
                    path: '/ui/tables/basic',
                    name: 'Basic',
                    component: BasicTables,
                    route: Route,
                },
                {
                    path: '/ui/tables/advanced',
                    name: 'Advanced',
                    component: AdvancedTables,
                    route: Route,
                },
            ],
        }        
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
const authProtectedRoutes = [rootRoute, dashboardRoutes, uiRoutes];
const publicRoutes = [];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);

export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
