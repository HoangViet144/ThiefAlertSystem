import client from 'mqttClient';
import { TOPIC_SPEAKER, TOPIC_LED, TOPIC_RELAY } from 'constants';

const output = () => {
  client.on('connect', () => {
    console.log('===> Output devices is ready <===');
    client.subscribe(TOPIC_SPEAKER);
    client.subscribe(TOPIC_LED);
    client.subscribe(TOPIC_RELAY);
  });
  client.on('message', (topic, message) => {
    try {
      const msg = JSON.parse(message)[0];
      console.log('===> OUTPUT DEVICES <===');
      console.log(msg);
    } catch (error) {
      console.error(error);
    }
  });
};

export default output;
