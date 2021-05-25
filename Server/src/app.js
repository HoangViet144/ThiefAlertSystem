import {} from 'dotenv/config';
import express from 'express';

import admin from './firebase/firebase';
import authRouter from 'apiRoutes/auth';
import systemRouter from 'apiRoutes/system';
import userRouter from 'apiRoutes/users';

const app = express();

app.use('/api/auth', authRouter);
app.use('/api/system', systemRouter);
app.use('/api/users', userRouter);

app.get('/api', async (req, res) => {
  try {
    const response = await admin
      .firestore()
      .collection('testing')
      .doc('test')
      .get();
    res.status(200).send(response.data().content);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal server error');
  }
});

export default app;
