import sample from 'lodash/sample';

import client from 'mqttClient';
import { TOPIC_MAGNETIC } from 'constants';

const magneticValues = [0, 1];

const testPub = () => {
  client.on('connect', () => {
    console.log('===> Magnetic Publisher is ready <===');

    setInterval(() => {
      const message = JSON.stringify([
        {
          id: '8',
          name: 'MAGNETIC',
          data: sample(magneticValues),
          unit: '',
        },
      ]);
      console.log('TEST MAGNETIC SEND', message);
      client.publish(TOPIC_MAGNETIC, message);
    }, 10000);
  });
};

export default testPub;
