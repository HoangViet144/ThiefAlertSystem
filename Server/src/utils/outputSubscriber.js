import {} from 'dotenv/config';
import mqtt from 'mqtt';

import { TOPIC_SPEAKER, TOPIC_LED, TOPIC_RELAY } from 'constants';

const { MQTT_USER_NAME, MQTT_PASSWORD } = process.env;

const testSubClient = mqtt.connect({
  servers: [{ host: 'io.adafruit.com', port: 1883, protocol: 'tcp' }],
  username: MQTT_USER_NAME,
  password: MQTT_PASSWORD,
});

const output = () => {
  testSubClient.on('connect', () => {
    console.log('===> Output devices is ready <===');
    testSubClient.subscribe(TOPIC_SPEAKER);
    testSubClient.subscribe(TOPIC_LED);
    testSubClient.subscribe(TOPIC_RELAY);
  });
  testSubClient.on('message', (topic, message) => {
    try {
      const msg = JSON.parse(message);
      console.log('===> OUTPUT DEVICES <===');
      console.log(msg);
    } catch (error) {
      console.error(error);
    }
  });
};

export default output;
