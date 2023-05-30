import express from 'express';
import { checkWebsite } from './checker.js';

const app = express();
const port = process.env.PORT || 3456;

app.use('/healthz', async (req, res, next) => {
  console.log('Request: ', req.url);
  await checkWebsite();
  next();
});

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => console.log(`Website-checker is listening on port ${port}.`));