import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as layoutConstants from '../constants/layout';

// All layouts/containers
import VerticalLayout from '../layouts/Vertical';
import DetachedLayout from '../layouts/Detached';
import HorizontalLayout from '../layouts/Horizontal/';

import { allFlattenRoutes } from './index';

const Routes = (props) => {
    const { layout, user } = useSelector((state) => ({
        layout: state.Layout,
        //user: state.Auth.user,
    }));

    const getLayout = () => {
        let layoutCls = VerticalLayout;

        switch (layout.layoutType) {
            case layoutConstants.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            case layoutConstants.LAYOUT_DETACHED:
                layoutCls = DetachedLayout;
                break;
            default:
                layoutCls = VerticalLayout

        }
        // layoutCls = HorizontalLayout;

        // console.log("layout used " + layout.layoutType);
        return layoutCls;
    };

    let Layout = getLayout();

    return (
        <BrowserRouter>
            <Switch>
                {/* <Route path={publicProtectedFlattenRoutes.map((r) => r['path'])}>
                    <DefaultLayout {...props} layout={layout}>
                        <Switch>
                            {publicProtectedFlattenRoutes.map((route, index) => {
                                return (
                                    !route.children && (
                                        <route.route
                                            key={index}
                                            path={route.path}
                                            roles={route.roles}
                                            exact={route.exact}
                                            component={route.component}
                                        />
                                    )
                                );
                            })}
                        </Switch>
                    </DefaultLayout>
                </Route> */}

                <Route path={allFlattenRoutes.map((r) => r['path'])}>
                    <Layout {...props} layout={layout} >
                        <Switch>
                            {allFlattenRoutes.map((route, index) => {
                                return (
                                    !route.children && (
                                        <route.route
                                            key={index}
                                            path={route.path}
                                            roles={route.roles}
                                            exact={route.exact}
                                            component={route.component}
                                        />
                                    )
                                );
                            })}
                        </Switch>
                    </Layout>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
