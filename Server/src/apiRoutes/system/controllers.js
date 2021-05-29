import client from 'mqttClient';

import { TOPIC_SPEAKER, TOPIC_LED, TOPIC_RELAY } from 'constants';

const offAlert = (req, res) => {
  client.publish(
    TOPIC_SPEAKER,
    JSON.stringify([
      {
        id: 3,
        name: 'SPEAKER',
        data: 0,
        unit: '',
      },
    ])
  );

  client.publish(
    TOPIC_LED,
    JSON.stringify([
      {
        id: 1,
        name: 'LED',
        data: 0,
        unit: '',
      },
    ])
  );

  global.sentNotification = false;

  console.log('===> TURN OFF ALERT <===');

  res.send('Off Alert');
};

const offSystem = (req, res) => {
  client.publish(
    TOPIC_RELAY,
    JSON.stringify([
      {
        id: 11,
        name: 'RELAY',
        data: 0,
        unit: '',
      },
    ])
  );

  global.sentNotification = false;

  console.log('!!! TURN OFF THE WHOLE SYSTEM !!!');

  res.send('Off SYSTEM');
};

const onSystem = (req, res) => {
  client.publish(
    TOPIC_RELAY,
    JSON.stringify([
      {
        id: 11,
        name: 'RELAY',
        data: 1,
        unit: '',
      },
    ])
  );

  global.sentNotification = false;

  console.log('!!! SYSTEM IS TURNED ON !!!');

  res.send('ON SYSTEM');
};

export { offAlert, offSystem, onSystem };
