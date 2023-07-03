import React from 'react';
import ReactDom from 'react-dom/client';

import AddIcon from '@mui/icons-material/Add';

import WeatherCard from './weatherCard';
import { Box, Grid, IconButton, InputBase, Paper } from '@mui/material';

import './popup.css';

const App: React.FC<{}> = () => {
  const [cities, setCities] = React.useState<string[]>(['toronto', 'New York']);

  const [cityInput, setCityInput] = React.useState<string>('');

  const AddToList = () => {
    if (cityInput) {
      setCities((pre) => [...pre, cityInput]);
    }
    setCityInput('');
  };

  const handleDelete = (index: number) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setCities([...newCities]);
  };

  return (
    <Box mx="8px" my="16px">
      <Grid container>
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
              />
              <IconButton type="button">
                <AddIcon onClick={AddToList} />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities.map((city, ind) => (
        <WeatherCard key={ind + city} city={city} onDelete={() => handleDelete(ind)} />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDom.createRoot(root).render(<App />);
