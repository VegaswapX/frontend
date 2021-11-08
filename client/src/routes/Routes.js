import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

// All layouts/containers
import DetachedLayout from "../layouts/Detached";

import { allFlattenRoutes } from "./index";

const Routes = (props) => {
  const { layout } = useSelector((state) => ({
    layout: state.Layout,
    //user: state.Auth.user,
  }));

  const getLayout = () => {
    let layoutCls = DetachedLayout;

    console.log("layout used " + layout.layoutType);
    return layoutCls;
  };

  let Layout = getLayout();

  return (
    <BrowserRouter>
      <Switch>
        <Route path={allFlattenRoutes.map((r) => r["path"])}>
          <Layout {...props} layout={layout}>
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
