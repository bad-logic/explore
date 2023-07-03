import React from 'react';
import ReactDom from 'react-dom/client';

import AddIcon from '@mui/icons-material/Add';

import WeatherCard from './weatherCard';
import { Box, Grid, IconButton, InputBase, Paper } from '@mui/material';
import {
  getStoredCities,
  setStorageCities,
  setStorageOptions,
  getStorageOptions,
  LocalStorageOptions,
} from '../utils/storage';

import './popup.css';

const App: React.FC<{}> = () => {
  const [cities, setCities] = React.useState<string[]>([]);
  const [options, setOptions] = React.useState<LocalStorageOptions | null>(null);

  React.useEffect(() => {
    getStoredCities().then((cities) => {
      setCities(cities);
    });
    getStorageOptions().then((options) => {
      console.log({ options });
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

  if (!options) {
    return null;
  }

  return (
    <Box mx="8px" my="16px">
      <Grid container justifyContent="space-evenly">
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
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
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities.map((city, ind) => (
        <WeatherCard key={ind + city} city={city} onDelete={() => handleDelete(ind)} tempScale={options.tempScale} />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDom.createRoot(root).render(<App />);
