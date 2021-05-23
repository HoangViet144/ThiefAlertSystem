import {} from 'dotenv/config';
import express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.send('Hello, things are good');
});

export default app;
