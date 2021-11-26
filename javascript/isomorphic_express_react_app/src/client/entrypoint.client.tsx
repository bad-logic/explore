import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';

const Client: React.FC = () => {
  return (
    <BrowserRouter>
      <Menu />
      <React.Suspense fallback={<span>loading...</span>}>
        <Switch>
          <Route
            exact
            path={'/'}
            component={React.lazy(() => import('./pages/home'))}
          />
          <Route
            path={'/about-us'}
            component={React.lazy(() => import('./pages/about'))}
          />
          <Route
            path={'/contact-us'}
            component={React.lazy(() => import('./pages/contact'))}
          />
          <Route component={React.lazy(() => import('./pages/404'))} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Client;
