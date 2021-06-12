import sample from 'lodash/sample';

import client from 'mqttClient';
import { TOPIC_TIME } from 'constants';
import { MSG_TIME } from '../constants';

const timeValue = ['16:00:00', '19:00:00', '22:00:00', '00:00:00', '01:59:02'];

const testPub = () => {
  client.on('connect', () => {
    console.log('===> Time Publisher is ready <===');

    setInterval(() => {
      const message = JSON.stringify({
        ...MSG_TIME,
        data: sample(timeValue),
      });
      console.log('TEST TIME SEND', message);
      client.publish(TOPIC_TIME, message);
    }, 15000);
  });
};

export default testPub;
