import React from 'react';
import { Route, Switch, StaticRouter } from 'react-router-dom';
import Home from './pages/home';
import NotFound from './pages/404';
import ContactUs from './pages/contact';
import AboutUs from './pages/about';
import Menu from './components/Menu';
interface ServerProps {
  location: string;
}
const Server: React.FC<ServerProps> = ({ location }) => {
  return (
    <StaticRouter location={location}>
      <Menu />
      <Switch>
        <Route exact path={'/'} component={Home} />
        <Route path={'/about-us'} component={AboutUs} />
        <Route path={'/contact-us'} component={ContactUs} />
        <Route component={NotFound} />
      </Switch>
    </StaticRouter>
  );
};

export default Server;
