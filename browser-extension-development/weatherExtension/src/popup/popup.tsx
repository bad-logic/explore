import React from 'react';
import ReactDOM from 'react-dom/client';

import AddIcon from '@mui/icons-material/Add';
import { PictureInPictureAlt } from '@mui/icons-material';

import WeatherCard from '../components/weatherCard';
import { Box, Grid, IconButton, InputBase, Paper } from '@mui/material';
import {
  getStoredCities,
  setStorageCities,
  setStorageOptions,
  getStorageOptions,
  LocalStorageOptions,
} from '../utils/storage';

import './popup.css';
import { Messages } from '../utils/messages';

const App: React.FC<{}> = () => {
  const [cities, setCities] = React.useState<string[]>([]);
  const [options, setOptions] = React.useState<LocalStorageOptions | null>(null);

  React.useEffect(() => {
    getStoredCities().then((cities) => {
      setCities(cities);
    });
    getStorageOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const [cityInput, setCityInput] = React.useState<string>('');

  const AddToList = () => {
    if (cityInput) {
      const newCities = [...cities, cityInput];
      setStorageCities([...newCities]).then(() => {
        setCities([...newCities]);
        setCityInput('');
      });
    }
  };

  const handleDelete = (index: number) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setStorageCities([...newCities]).then(() => {
      setCities([...newCities]);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
    };
    setStorageOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    });
  };

  const handleOverlayButtonClick = () => {
    chrome.tabs.query(
      {
        active: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
        }
      }
    );
  };

  if (!options) {
    return null;
  }

  return (
    <Box mx="8px" my="16px">
      <Grid container justifyContent="space-evenly">
        <Grid item>
          <Paper>
            <Box px="8px" py="4px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
              />
              <IconButton type="button" onClick={AddToList}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box py="4px">
              <IconButton type="button" onClick={handleOverlayButtonClick}>
                <PictureInPictureAlt />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box py="2px">
              <IconButton type="button" onClick={handleTempScaleButtonClick}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {options.homeCity !== '' && <WeatherCard city={options.homeCity} tempScale={options.tempScale} />}
      {cities.map((city, ind) => (
        <WeatherCard key={ind + city} city={city} onDelete={() => handleDelete(ind)} tempScale={options.tempScale} />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.createRoot(root).render(<App />);
