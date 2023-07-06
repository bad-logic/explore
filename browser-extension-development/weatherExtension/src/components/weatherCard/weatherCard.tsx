import React from 'react';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

import { IOpenWeatherData, OpenWeatherTempScale, fetchOpenWeatherData } from '../../utils/api';

import './weatherCard.css';

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx="4px" my="26px">
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color="error" onClick={onDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

type WeatherCardState = 'loading' | 'error' | 'ready';

const WeatherCard: React.FC<{ city: string; tempScale: OpenWeatherTempScale; onDelete?: () => void }> = ({
  city,
  tempScale,
  onDelete,
}) => {
  const [cardState, setCardState] = React.useState<WeatherCardState>('loading');
  const [weather, setWeather] = React.useState<IOpenWeatherData | null>(null);
  React.useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((res) => {
        setWeather(res);
        setCardState('ready');
      })
      .catch((err) => {
        setCardState('error');
      });
  }, [city, tempScale]);

  if (cardState === 'loading' || cardState === 'error') {
    return (
      <WeatherCardContainer onDelete={cardState === 'error' && onDelete}>
        <Typography className="weather-card-title">{city}</Typography>
        <Typography className="weather-card-body">
          {cardState === 'loading' ? 'Loading...' : `Error: could not retrieve data for this city.`}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography className="weather-card-title">{weather.name}</Typography>
      <Typography className="weather-card-body">{Math.round(weather.main.temp)}</Typography>
      <Typography className="weather-card-body">Feels like: {Math.round(weather.main.feels_like)}</Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
