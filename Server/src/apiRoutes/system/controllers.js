import client from 'mqttClient';

import { TOPIC_SPEAKER, TOPIC_LED, TOPIC_RELAY } from 'constants';
import {
  MSG_SPEAKER_OFF,
  MSG_LED_OFF,
  MSG_RELAY_OFF,
  MSG_RELAY_ON,
} from 'constants';

const offAlert = (req, res) => {
  client.publish(TOPIC_SPEAKER, JSON.stringify(MSG_SPEAKER_OFF));

  client.publish(TOPIC_LED, JSON.stringify(MSG_LED_OFF));

  global.sentNotification = false;

  console.log('===> TURN OFF ALERT <===');

  res.send('Off Alert');
};

const offSystem = (req, res) => {
  client.publish(TOPIC_RELAY, JSON.stringify(MSG_RELAY_OFF));

  global.sentNotification = false;
  global.systemStatus = 'off';

  console.log('!!! TURN OFF THE WHOLE SYSTEM !!!');

  res.send('Off SYSTEM');
};

const onSystem = (req, res) => {
  client.publish(TOPIC_RELAY, JSON.stringify(MSG_RELAY_ON));

  global.sentNotification = false;

  console.log('!!! SYSTEM IS TURNED ON !!!');

  res.send('ON SYSTEM');
};

const getSystemStatus = (req, res) => {
  res.send({ status: global.systemStatus });
};

export { offAlert, offSystem, onSystem, getSystemStatus };
