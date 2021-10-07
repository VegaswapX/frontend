const MENU_ITEMS = [
    // { key: 'navigation', label: '', isTitle: true },
    { key: 'boost', label: 'Boost Pools', isTitle: false, icon: 'dripicons-rocket', url: '/dashboard/boost' },

    { key: 'liq', label: 'Liquidity', isTitle: false, icon: 'uil-layer-group', url: '/dashboard/liq' },

    {
        key: 'tables',
        label: 'Transactions',
        isTitle: false,
        icon: 'uil-table',
        url: '/dashboard/tx'
    },

    // {
    //     key: 'dashboards',
    //     label: 'Pools',
    //     isTitle: false,
    //     icon: 'uil-home-alt',
    //     badge: { variant: 'success', text: '4' },
    //     children: [
    //         // { key: 'ds-analytics', label: 'Analytics', url: '/dashboard/analytics', parentKey: 'dashboards' },
    //         { key: 'ds-crm', label: 'Boost pool', url: '/dashboard/boost', parentKey: 'dashboards' },
    //         // { key: 'ds-ecommerce', label: 'Ecommerce', url: '/dashboard/ecommerce', parentKey: 'dashboards' },
    //         { key: 'ds-project', label: 'Projects', url: '/dashboard/project', parentKey: 'dashboards' },
    //     ],
    // },    
                
    { key: 'Extra components', label: 'Components', isTitle: true },
    {
        key: 'base-ui',
        label: 'Base UI',
        isTitle: false,
        icon: 'uil-box',
        children: [
            { key: 'base-ui-accordions', label: 'Accordions', url: '/ui/accordions', parentKey: 'base-ui' },
            { key: 'base-ui-alerts', label: 'Alerts', url: '/ui/alerts', parentKey: 'base-ui' },
            { key: 'base-ui-avatars', label: 'Avatars', url: '/ui/avatars', parentKey: 'base-ui' },
            { key: 'base-ui-badges', label: 'Badges', url: '/ui/badges', parentKey: 'base-ui' },
            { key: 'base-ui-breadcrumb', label: 'Breadcrumb', url: '/ui/breadcrumb', parentKey: 'base-ui' },
            { key: 'base-ui-buttons', label: 'Buttons', url: '/ui/buttons', parentKey: 'base-ui' },
            { key: 'base-ui-cards', label: 'Cards', url: '/ui/cards', parentKey: 'base-ui' },
            { key: 'base-ui-carousel', label: 'Carousel', url: '/ui/carousel', parentKey: 'base-ui' },
            { key: 'base-ui-dropdown', label: 'Dropdowns', url: '/ui/dropdowns', parentKey: 'base-ui' },
            { key: 'base-ui-embedvideo', label: 'Embed Video', url: '/ui/embedvideo', parentKey: 'base-ui' },
            { key: 'base-ui-grid', label: 'Grid', url: '/ui/grid', parentKey: 'base-ui' },
            { key: 'base-ui-listgroups', label: 'List Groups', url: '/ui/listgroups', parentKey: 'base-ui' },
            { key: 'base-ui-modals', label: 'Modals', url: '/ui/modals', parentKey: 'base-ui' },
            { key: 'base-ui-notifications', label: 'Notifications', url: '/ui/notifications', parentKey: 'base-ui' },
            { key: 'base-ui-offcanvas', label: 'Offcanvas', url: '/ui/offcanvas', parentKey: 'base-ui' },
            { key: 'base-ui-paginations', label: 'Paginations', url: '/ui/paginations', parentKey: 'base-ui' },
            { key: 'base-ui-popovers', label: 'Popovers', url: '/ui/popovers', parentKey: 'base-ui' },
            { key: 'base-ui-progress', label: 'Progress', url: '/ui/progress', parentKey: 'base-ui' },
            { key: 'base-ui-ribbons', label: 'Ribbons', url: '/ui/ribbons', parentKey: 'base-ui' },
            { key: 'base-ui-spinners', label: 'Spinners', url: '/ui/spinners', parentKey: 'base-ui' },
            { key: 'base-ui-tabs', label: 'Tabs', url: '/ui/tabs', parentKey: 'base-ui' },
            { key: 'base-ui-tooltips', label: 'Tooltips', url: '/ui/tooltips', parentKey: 'base-ui' },
            { key: 'base-ui-typography', label: 'Typography', url: '/ui/typography', parentKey: 'base-ui' },
        ],
    },
    
    
    {
        key: 'icons',
        label: 'Icons',
        isTitle: false,
        icon: 'uil-streering',
        children: [
            { key: 'icon-dripicons', label: 'Dripicons', url: '/ui/icons/dripicons', parentKey: 'icons' },
            { key: 'icon-mdiicons', label: 'Material Design', url: '/ui/icons/mdi', parentKey: 'icons' },
            { key: 'icon-unicons', label: 'Unicons', url: '/ui/icons/unicons', parentKey: 'icons' },
        ],
    },    
    {
        key: 'charts',
        label: 'Charts',
        isTitle: false,
        icon: 'uil-chart',
        children: [
            { key: 'chart-apex', label: 'Apex Charts', url: '/ui/charts/apex', parentKey: 'charts' },
            { key: 'chart-brite', label: 'Brite Charts', url: '/ui/charts/brite', parentKey: 'charts' },
            { key: 'chart-chartjs', label: 'Chartjs', url: '/ui/charts/chartjs', parentKey: 'charts' },
        ],
    },
    
    
];

export default MENU_ITEMS;
