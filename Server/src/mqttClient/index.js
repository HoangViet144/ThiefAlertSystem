import {} from 'dotenv/config';
import mqtt from 'mqtt';

import admin from 'firebase/firebase';
import { User } from 'models';

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

const turnOnAlert = async () => {
  console.log('TURN ON ALERT');

  client.publish(TOPIC_SPEAKER, JSON.stringify(MSG_SPEAKER_ON));
  client.publish(TOPIC_LED, JSON.stringify(MSG_LED_ON));

  await sendNotification();
};

const sendNotification = async () => {
  if (!global.sentNotification) {
    console.log('Send notification via firebase to User');
    global.sentNotification = true;

    const users = await User.findAll();
    const token = users[0].fcmtoken;

    console.log(users);

    if (token) {
      await admin.messaging().sendToDevice(
        [token],
        {
          data: {
            message: 'Alert!!!!! Your house is being broken in!!!!',
          },
        },
        {
          contentAvailable: true,
          priority: 'high',
        }
      );
    }
  }
};

export const clientSubscribe = () => {
  try {
    client.on('connect', () => {
      console.log('Subcribe connect OK');
      client.subscribe(TOPIC_INFARED);
      client.subscribe(TOPIC_MAGNETIC);
    });

    client.on('message', async (topic, message) => {
      try {
        const msg = JSON.parse(message);
        console.log('MSG recieved', msg);

        // (msg.name === 'INFARED' && msg.data === ('1')) ||
        // (msg.name === 'MAGNETIC' && msg.data === 1)
        if (
          msg.data === '1' &&
          (msg.name === 'INFARED' || msg.name === 'MAGNETIC')
        ) {
          await turnOnAlert();
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
