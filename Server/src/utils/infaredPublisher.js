import sample from 'lodash/sample';
import client from 'mqttClient';
import { TOPIC_INFARED } from 'constants';
import { MSG_INFARED } from '../constants';

const infaredValues = ['0', '1'];

const testPub = () => {
  client.on('connect', () => {
    console.log('===> Infared Publisher is ready <===');

    setInterval(() => {
      const message = JSON.stringify({
        ...MSG_INFARED,
        data: sample(infaredValues),
      });
      console.log('TEST INFARED SEND', message);
      client.publish(TOPIC_INFARED, message);
    }, 10000);
  });
};

export default testPub;
