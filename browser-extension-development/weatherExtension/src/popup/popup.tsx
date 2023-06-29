import React from 'react';
import ReactDom from 'react-dom/client';
import WeatherCard from './weatherCard/';

import './popup.css';

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="toronto" />
      <WeatherCard city="toronto" />
      <WeatherCard city="toronto" />
    </div>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDom.createRoot(root).render(<App />);
