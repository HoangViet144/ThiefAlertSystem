import {} from 'dotenv/config';
import express from 'express';
import admin from './firebase/firebase';

const app = express();

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
