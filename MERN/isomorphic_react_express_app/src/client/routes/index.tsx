import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/404";
import ContactUs from "../pages/contact";
import AboutUs from "../pages/about";

const AppRoutes: React.FC = () => {
  return (
    <>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/contact-us"}>contact</Link>
        </li>
        <li>
          <Link to={"/about-us"}>About</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/about-us"} component={AboutUs} />
        <Route path={"/contact-us"} component={ContactUs} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default AppRoutes;
