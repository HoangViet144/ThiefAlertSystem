import {} from 'dotenv/config';
import mqtt from 'mqtt';

import {
  TOPIC_INFARED,
  TOPIC_MAGNETIC,
  TOPIC_SPEAKER,
  TOPIC_LED,
} from 'constants';
import { MSG_LED_ON, MSG_SPEAKER_ON } from 'constants';

const { MQTT_USER_NAME, MQTT_PASSWORD } = process.env;

const client = mqtt.connect({
  servers: [{ host: 'io.adafruit.com', port: 1883, protocol: 'tcp' }],
  username: MQTT_USER_NAME,
  password: MQTT_PASSWORD,
});

const turnOnAlert = () => {
  console.log('TURN ON ALERT');

  client.publish(TOPIC_SPEAKER, JSON.stringify(MSG_SPEAKER_ON));
  client.publish(TOPIC_LED, JSON.stringify(MSG_LED_ON));

  sendNotification();
};

const sendNotification = () => {
  if (!global.sentNotification) {
    console.log('Send notification via firebase to User');
    global.sentNotification = true;
  }
};

export const clientSubscribe = () => {
  try {
    client.on('connect', () => {
      console.log('Subcribe connect OK');
      client.subscribe(TOPIC_INFARED);
      client.subscribe(TOPIC_MAGNETIC);
    });

    client.on('message', (topic, message) => {
      try {
        const msg = JSON.parse(message);
        console.log('MSG recieved', msg);

        // (msg.name === 'INFARED' && msg.data === ('1')) ||
        // (msg.name === 'MAGNETIC' && msg.data === 1)
        if (
          msg.data === '1' &&
          (msg.name === 'INFARED' || msg.name === 'MAGNETIC')
        ) {
          turnOnAlert();
        }
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export default client;
