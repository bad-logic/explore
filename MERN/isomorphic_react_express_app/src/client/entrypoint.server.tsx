import React from 'react';
import { StaticRouter } from 'react-router-dom';
import AppRoutes from './routes';

interface ServerProps {
  location: string;
}
const Server: React.FC<ServerProps> = ({ location }) => {
  return (
    <StaticRouter location={location}>
      <AppRoutes />
    </StaticRouter>
  );
};

export default Server;
