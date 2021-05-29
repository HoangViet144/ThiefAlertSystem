import sample from 'lodash/sample';

import client from 'mqttClient';
import { TOPIC_MAGNETIC } from 'constants';
import { MSG_MAGNETIC } from '../constants';

const magneticValues = ['0', '1'];

const testPub = () => {
  client.on('connect', () => {
    console.log('===> Magnetic Publisher is ready <===');

    setInterval(() => {
      const message = JSON.stringify({
        ...MSG_MAGNETIC,
        data: sample(magneticValues),
      });
      console.log('TEST MAGNETIC SEND', message);
      client.publish(TOPIC_MAGNETIC, message);
    }, 10000);
  });
};

export default testPub;
