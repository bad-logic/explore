import React from 'react';
import ReactDOM from 'react-dom/client';

import WeatherCard from '../components/weatherCard';

import { Card } from '@mui/material';
import { LocalStorageOptions, getStorageOptions } from '../utils/storage';
import { Messages } from '../utils/messages';

import './contentScript.css';

const App: React.FC<{}> = () => {
  const [options, setOptions] = React.useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    getStorageOptions().then((options) => {
      setOptions(options);
      setIsActive(options.hasAutoOverlay);
    });
  }, []);

  React.useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Messages.TOGGLE_OVERLAY) {
        setIsActive((prev) => {
          return !prev;
        });
      }
    });
  }, []);

  if (!options) {
    return null;
  }

  return (
    <>
      {isActive && (
        <Card className="overlay-card">
          <WeatherCard city={options.homeCity} tempScale={options.tempScale} onDelete={() => setIsActive(false)} />
        </Card>
      )}
    </>
  );
};

const root = document.createElement('div');

document.body.appendChild(root);
ReactDOM.createRoot(root).render(<App />);
