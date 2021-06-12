import {} from 'dotenv/config';
import mqtt from 'mqtt';

import admin from 'firebase/firebase';
import { User } from 'models';
import { checkTimeInRange } from 'utils/checkTimeInRange';

import {
  TOPIC_INFARED,
  TOPIC_MAGNETIC,
  TOPIC_SPEAKER,
  TOPIC_LED,
  TOPIC_TIME,
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
      client.subscribe(TOPIC_TIME);
    });

    client.on('message', async (topic, message) => {
      try {
        const { name, data } = JSON.parse(message);
        console.log('MSG recieved', { name, data });

        if (name === 'TIME') {
          global.systemStatus = checkTimeInRange(global.setting, data)
            ? 'on'
            : 'off';

          console.log(
            `============================================================`
          );
          console.log(`==== TIME IS ${data}. SYSTEM IS ${global.systemStatus}`);
          console.log(
            `============================================================`
          );
        }

        // (name === 'INFARED' && data === ('1')) ||
        // (name === 'MAGNETIC' && data === 1)
        if (
          global.systemStatus === 'on' &&
          data === '1' &&
          (name === 'INFARED' || name === 'MAGNETIC')
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
