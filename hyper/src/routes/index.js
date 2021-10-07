import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import BoostPage from '../pages/dashboard/Boost';
import LiqPage from '../pages/vega/Liq';
import TxPage from '../pages/vega/Tx';

// import Route from './Route';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/account/Login'));
const Logout = React.lazy(() => import('../pages/account/Logout'));
const Register = React.lazy(() => import('../pages/account/Register'));
const Confirm = React.lazy(() => import('../pages/account/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/account/ForgetPassword'));
const LockScreen = React.lazy(() => import('../pages/account/LockScreen'));

const Login2 = React.lazy(() => import('../pages/account2/Login2'));
const Logout2 = React.lazy(() => import('../pages/account2/Logout2'));
const Register2 = React.lazy(() => import('../pages/account2/Register2'));
const Confirm2 = React.lazy(() => import('../pages/account2/Confirm2'));
const ForgetPassword2 = React.lazy(() => import('../pages/account2/ForgetPassword2'));
const LockScreen2 = React.lazy(() => import('../pages/account2/LockScreen2'));

// dashboard

// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar/'));
const Projects = React.lazy(() => import('../pages/apps/Projects/'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Projects/Detail/'));
const ProjectGannt = React.lazy(() => import('../pages/apps/Projects/Gantt/'));
const ProjectForm = React.lazy(() => import('../pages/apps/Projects/ProjectForm'));
// - chat
const ChatApp = React.lazy(() => import('../pages/apps/Chat/'));
// - ecommece pages
const EcommerceProducts = React.lazy(() => import('../pages/apps/Ecommerce/Products'));
const ProductDetails = React.lazy(() => import('../pages/apps/Ecommerce/ProductDetails'));
const Orders = React.lazy(() => import('../pages/apps/Ecommerce/Orders'));
const OrderDetails = React.lazy(() => import('../pages/apps/Ecommerce/OrderDetails'));
const Customers = React.lazy(() => import('../pages/apps/Ecommerce/Customers'));
const Cart = React.lazy(() => import('../pages/apps/Ecommerce/Cart'));
const Checkout = React.lazy(() => import('../pages/apps/Ecommerce/Checkout/'));
const Sellers = React.lazy(() => import('../pages/apps/Ecommerce/Sellers'));
// - email
const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
// - social
const SocialFeed = React.lazy(() => import('../pages/apps/SocialFeed/'));
// - tasks
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List/'));
const TaskDetails = React.lazy(() => import('../pages/apps/Tasks/Details'));
const Kanban = React.lazy(() => import('../pages/apps/Tasks/Board/'));
// - file
const FileManager = React.lazy(() => import('../pages/apps/FileManager'));

// pages
const Profile = React.lazy(() => import('../pages/profile'));
const Profile2 = React.lazy(() => import('../pages/profile2'));
const ErrorPageNotFound = React.lazy(() => import('../pages/error/PageNotFound'));
const ErrorPageNotFoundAlt = React.lazy(() => import('../pages/error/PageNotFoundAlt'));
const ServerError = React.lazy(() => import('../pages/error/ServerError'));
// - other
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const FAQ = React.lazy(() => import('../pages/other/FAQ'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Maintenance = React.lazy(() => import('../pages/other/Maintenance'));
const Starter = React.lazy(() => import('../pages/other/Starter'));
const PreLoader = React.lazy(() => import('../pages/other/PreLoader/'));
const Timeline = React.lazy(() => import('../pages/other/Timeline'));

const Landing = React.lazy(() => import('../pages/landing/'));

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

// maps
const GoogleMaps = React.lazy(() => import('../pages/maps/GoogleMaps'));
const VectorMaps = React.lazy(() => import('../pages/maps/VectorMaps'));

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard/boost" />,
    route: Route,
};

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
            path: '/dashboard/liq',
            name: 'Liq',
            component: LiqPage,
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

const calendarAppRoutes = {
    path: '/apps/calendar',
    name: 'Calendar',
    route: Route,
    roles: ['Admin'],
    icon: 'uil-calender',
    component: CalendarApp,
    header: 'Apps',
};

const chatAppRoutes = {
    path: '/apps/chat',
    name: 'Chat',
    route: Route,
    roles: ['Admin'],
    icon: 'uil-comments-alt',
    component: ChatApp,
};

const ecommerceAppRoutes = {
    path: '/apps/ecommerce',
    name: 'eCommerce',
    route: Route,
    roles: ['Admin'],
    icon: 'uil-store',
    children: [
        {
            path: '/apps/ecommerce/products',
            name: 'Products',
            component: EcommerceProducts,
            route: Route,
        },
        {
            path: '/apps/ecommerce/details',
            name: 'Product Details',
            component: ProductDetails,
            route: Route,
        },
        {
            path: '/apps/ecommerce/orders',
            name: 'Orders',
            component: Orders,
            route: Route,
        },
        {
            path: '/apps/ecommerce/order/details',
            name: 'Order Details',
            component: OrderDetails,
            route: Route,
        },
        {
            path: '/apps/ecommerce/customers',
            name: 'Customers',
            component: Customers,
            route: Route,
        },
        {
            path: '/apps/ecommerce/shopping-cart',
            name: 'Shopping Cart',
            component: Cart,
            route: Route,
        },
        {
            path: '/apps/ecommerce/checkout',
            name: 'Checkout',
            component: Checkout,
            route: Route,
        },
        {
            path: '/apps/ecommerce/sellers',
            name: 'Sellers',
            component: Sellers,
            route: Route,
        },
    ],
};

const emailAppRoutes = {
    path: '/apps/email',
    name: 'Email',
    route: Route,
    roles: ['Admin'],
    icon: 'uil-envelope',
    children: [
        {
            path: '/apps/email/inbox',
            name: 'Inbox',
            component: Inbox,
            route: Route,
        },
        {
            path: '/apps/email/details',
            name: 'Email Details',
            component: EmailDetail,
            route: Route,
        },
    ],
};

const projectAppRoutes = {
    path: '/apps/projects',
    name: 'Projects',
    route: Route,
    roles: ['Admin'],
    icon: 'uil-briefcase',

    children: [
        {
            path: '/apps/projects/list',
            name: 'List',
            component: Projects,
            route: Route,
        },
        {
            path: '/apps/projects/:id/details',
            name: 'Detail',
            component: ProjectDetail,
            route: Route,
        },
        {
            path: '/apps/projects/gantt',
            name: 'Gantt',
            component: ProjectGannt,
            route: Route,
        },
        {
            path: '/apps/projects/new',
            name: 'Create Project',
            component: ProjectForm,
            route: Route,
        },
    ],
};

const socialAppRoutes = {
    path: '/apps/social',
    name: 'Social Feed',
    route: Route,
    roles: ['Admin'],
    icon: 'uil-rss',
    component: SocialFeed,
};

const taskAppRoutes = {
    path: '/apps/tasks',
    name: 'Tasks',
    route: Route,
    roles: ['Admin'],
    icon: 'uil-clipboard-alt',
    children: [
        {
            path: '/apps/tasks/list',
            name: 'Task List',
            component: TaskList,
            route: Route,
        },
        {
            path: '/apps/tasks/details',
            name: 'Task List',
            component: TaskDetails,
            route: Route,
        },
        {
            path: '/apps/tasks/kanban',
            name: 'Kanban',
            component: Kanban,
            route: Route,
        },
    ],
};

const fileAppRoutes = {
    path: '/apps/file',
    name: 'File Manager',
    route: Route,
    roles: ['Admin'],
    icon: 'uil-folder-plus',
    component: FileManager,
};

const appRoutes = [
    calendarAppRoutes,
    chatAppRoutes,
    ecommerceAppRoutes,
    emailAppRoutes,
    projectAppRoutes,
    socialAppRoutes,
    taskAppRoutes,
    fileAppRoutes,
];

// pages
const pageRoutes = {
    path: '/pages',
    name: 'Pages',
    icon: 'uil-copy-alt',
    header: 'Custom',
    children: [
        {
            path: '/pages/profile',
            name: 'Profile',
            component: Profile,
            route: Route,
        },
        {
            path: '/pages/profile2',
            name: 'Profile2',
            component: Profile2,
            route: Route,
        },
        {
            path: '/pages/invoice',
            name: 'Invoice',
            component: Invoice,
            route: Route,
        },
        {
            path: '/pages/faq',
            name: 'FAQ',
            component: FAQ,
            route: Route,
        },
        {
            path: '/pages/pricing',
            name: 'Pricing',
            component: Pricing,
            route: Route,
        },
        {
            path: '/pages/error-404-alt',
            name: 'Error - 404-alt',
            component: ErrorPageNotFoundAlt,
            route: Route,
        },
        {
            path: '/pages/starter',
            name: 'Starter Page',
            component: Starter,
            route: Route,
        },
        {
            path: '/pages/preloader',
            name: 'Starter Page',
            component: PreLoader,
            route: Route,
        },
        {
            path: '/pages/timeline',
            name: 'Timeline',
            component: Timeline,
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
        },
        {
            path: '/ui/maps',
            name: 'Maps',
            children: [
                {
                    path: '/ui/googlemaps',
                    name: 'Google Maps',
                    component: GoogleMaps,
                    route: Route,
                },
                {
                    path: '/ui/vectorMaps',
                    name: 'Google Maps',
                    component: VectorMaps,
                    route: Route,
                },
            ],
        },
    ],
};

const otherPublicRoutes = [
    {
        path: '/landing',
        name: 'landing',
        component: Landing,
        route: Route,
    },
    {
        path: '/maintenance',
        name: 'Maintenance',
        component: Maintenance,
        route: Route,
    },
    {
        path: '/error-404',
        name: 'Error - 404',
        component: ErrorPageNotFound,
        route: Route,
    },
    {
        path: '/error-500',
        name: 'Error - 500',
        component: ServerError,
        route: Route,
    },
    {
        path: '/account/confirm',
        name: 'Confirm',
        component: Confirm,
        route: Route,
    },
];

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

// auth
const authRoutes = [
    {
        path: '/account/login',
        name: 'Login',
        component: Login,
        route: Route,
    },
    {
        path: '/account/logout',
        name: 'Logout',
        component: Logout,
        route: Route,
    },
    {
        path: '/account/register',
        name: 'Register',
        component: Register,
        route: Route,
    },
    {
        path: '/account/forget-password',
        name: 'Forget Password',
        component: ForgetPassword,
        route: Route,
    },
    {
        path: '/account/lock-screen',
        name: 'Lock Screen',
        component: LockScreen,
        route: Route,
    },
    {
        path: '/account/login2',
        name: 'Login2',
        component: Login2,
        route: Route,
    },
    {
        path: '/account/logout2',
        name: 'Logout2',
        component: Logout2,
        route: Route,
    },
    {
        path: '/account/register2',
        name: 'Register2',
        component: Register2,
        route: Route,
    },
    {
        path: '/account/confirm2',
        name: 'Confirm2',
        component: Confirm2,
        route: Route,
    },
    {
        path: '/account/forget-password2',
        name: 'Forget Password2',
        component: ForgetPassword2,
        route: Route,
    },
    {
        path: '/account/lock-screen2',
        name: 'Lock Screen2',
        component: LockScreen2,
        route: Route,
    },
];

// All routes
const authProtectedRoutes = [rootRoute, dashboardRoutes, ...appRoutes, pageRoutes, uiRoutes];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);

export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
