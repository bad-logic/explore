import express from 'express';
import { serverSideRendering } from './middlewares/ssr';
import path from 'path';

const app = express();

app.get('/api', (req, res) => {
  res.send('apis here');
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/*', serverSideRendering);

app.listen(3000, () => {
  console.log('app started at port 3000');
});
