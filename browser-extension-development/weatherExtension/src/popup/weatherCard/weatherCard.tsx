import React from 'react';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

import { IOpenWeatherData, OpenWeatherTempScale, fetchOpenWeatherData } from '../../utils/api';

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
        console.error({ err });
        setCardState('error');
      });
  }, [city, tempScale]);

  if (cardState === 'loading' || cardState === 'error') {
    return (
      <WeatherCardContainer onDelete={cardState === 'error' && onDelete}>
        <Typography variant="body1">
          {cardState === 'loading' ? 'Loading...' : 'Error: could not retrieve data for this city.'}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant="h5">{weather.name}</Typography>
      <Typography variant="body1">{Math.round(weather.main.temp)}</Typography>
      <Typography variant="body1">Feels like: {Math.round(weather.main.feels_like)}</Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
