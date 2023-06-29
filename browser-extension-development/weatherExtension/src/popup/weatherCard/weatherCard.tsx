import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

import { IOpenWeatherData, fetchOpenWeatherData } from '../../utils/api';

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  const [weather, setWeather] = React.useState<IOpenWeatherData | null>(null);
  React.useEffect(() => {
    fetchOpenWeatherData('toronto')
      .then((res) => {
        setWeather(res);
      })
      .catch((err) => {
        console.error({ err });
      });
  }, [city]);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <Box mx="4px" my="26px">
      <Card>
        <CardContent>
          <Typography variant="h5">{weather.name}</Typography>
          <Typography variant="body1">{Math.round(weather.main.temp)}</Typography>
          <Typography variant="body1">Feels like: {Math.round(weather.main.feels_like)}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WeatherCard;
