const MENU_ITEMS = [
    // { key: 'navigation', label: '', isTitle: true },
    { key: 'boost', label: 'Boost Pool', isTitle: false, icon: 'dripicons-rocket', 
    // url: '/dashboard/boost' 
    children: [
        { key: 'pool1', label: 'USDT', url:  '/boost' , parentKey: 'boost' },
        { key: 'pool2', label: 'VGA', url:  '/boostvga' , parentKey: 'boost' }
    ]
    },
    { key: 'swap', label: 'Swap', isTitle: false, icon: 'uil-exchange', url: '/swap' },
    { key: 'liq', label: 'Liquidity', isTitle: false, icon: 'uil-layer-group', url: '/liq' },

    // { key: 'liq', label: 'Liquidity', isTitle: false, icon: 'uil-layer-group', url: '/dashboard/liq' },

    // {
    //     key: 'tables',
    //     label: 'Transactions',
    //     isTitle: false,
    //     icon: 'uil-table',
    //     url: '/dashboard/tx'
    // },
                    
    
    
];

export default MENU_ITEMS;
