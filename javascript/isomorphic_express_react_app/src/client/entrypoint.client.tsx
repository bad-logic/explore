import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

const Client: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default Client;
