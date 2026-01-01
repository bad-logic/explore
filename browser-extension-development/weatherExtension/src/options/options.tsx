import React from 'react';
import ReactDOM from 'react-dom/client';

import { Box, Button, Card, CardContent, Grid, Switch, TextField, Typography } from '@mui/material';
import { LocalStorageOptions, getStorageOptions, setStorageOptions } from '../utils/storage';
import './options.css';

type FormState = 'ready' | 'saving';

const Options: React.FC<{}> = () => {
  const [options, setOptions] = React.useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = React.useState<FormState>('ready');

  React.useEffect(() => {
    getStorageOptions().then((res) => {
      setOptions(res);
    });
  }, []);

  const handleHomeCityChange = (homeCity: string) => {
    setOptions((p) => ({ ...p, homeCity: homeCity }));
  };

  const handleAutoOverlayChange = (overlay: boolean) => {
    setOptions((p) => ({ ...p, hasAutoOverlay: overlay }));
  };

  const handleSaveClick = () => {
    setFormState('saving');
    setStorageOptions({ ...options }).then((_) => {
      setTimeout(() => {
        setFormState('ready');
      }, 800);
    });
  };

  if (!options) {
    return null;
  }

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home City Name</Typography>
              <TextField
                value={options ? options.homeCity : ''}
                fullWidth
                placeholder="Enter a home city name"
                onChange={(e) => handleHomeCityChange(e.target.value)}
                disabled={formState === 'saving'}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">Auto Toggle Overlay</Typography>
              <Switch
                color="primary"
                checked={options.hasAutoOverlay}
                onChange={(e, checked) => handleAutoOverlayChange(checked)}
                disabled={formState === 'saving'}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSaveClick} disabled={formState === 'saving'}>
                {formState === 'ready' ? 'save' : 'saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.createRoot(root).render(<Options />);
