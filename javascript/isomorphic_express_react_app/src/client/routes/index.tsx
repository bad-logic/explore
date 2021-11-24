import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/404";

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRoutes;
