import {} from 'dotenv/config';
import mqtt from 'mqtt';

import {
  TOPIC_INFARED,
  TOPIC_MAGNETIC,
  TOPIC_SPEAKER,
  TOPIC_LED,
} from 'constants';

const { MQTT_USER_NAME, MQTT_PASSWORD } = process.env;

const client = mqtt.connect({
  servers: [{ host: 'io.adafruit.com', port: 1883, protocol: 'tcp' }],
  username: MQTT_USER_NAME,
  password: MQTT_PASSWORD,
});

const turnOnAlert = () => {
  console.log('TURN ON ALERT');
  const speakerOnMsg = JSON.stringify([
    {
      id: 3,
      name: 'SPEAKER',
      data: 1020,
      unit: '',
    },
  ]);

  const ledOnMsg = JSON.stringify([
    {
      id: 1,
      name: 'LED',
      data: 1,
      unit: '',
    },
  ]);

  client.publish(TOPIC_SPEAKER, speakerOnMsg);
  client.publish(TOPIC_LED, ledOnMsg);

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
        const msg = JSON.parse(message)[0];
        console.log('MSG recieved', msg);

        if (
          (msg.name === 'INFARED' && msg.data.includes('1')) ||
          (msg.name === 'MAGNETIC' && msg.data === 1)
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
