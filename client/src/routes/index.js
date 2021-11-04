import React from "react";
import { Route, Redirect } from "react-router-dom";
import SwapPage from "../pages/Swap";
import { BoostPage } from "../pages/Boost";
import LiqPage from "../pages/liquidity";

import { DashboardPage } from "../pages/Dashboard";

// lazy load all the views

const baseRoute = {
  path: "/",
  exact: true,
  component: () => <Redirect to="/swap" />,
  route: Route,
};

// dashboards
const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboards",
  icon: "uil-home-alt",
  header: "Navigation",
  children: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardPage,
      route: Route,
    },
    {
      path: "/boost",
      name: "Boost",
      component: BoostPage,
      route: Route,
    },
    {
      path: "/liq",
      name: "Liq",
      component: LiqPage,
      route: Route,
    },
    {
      path: "/swap",
      name: "Swap",
      component: SwapPage,
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

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

const allRoutes = [baseRoute, dashboardRoutes];

const allFlattenRoutes = flattenRoutes([...allRoutes]);

export { allRoutes, allFlattenRoutes };
