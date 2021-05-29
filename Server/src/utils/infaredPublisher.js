import sample from 'lodash/sample';
import client from 'mqttClient';
import { TOPIC_INFARED } from 'constants';

const infaredValues = ['00', '01', '10', '11'];

const testPub = () => {
  client.on('connect', () => {
    console.log('===> Infared Publisher is ready <===');

    setInterval(() => {
      const message = JSON.stringify([
        {
          id: '6',
          name: 'INFARED',
          data: sample(infaredValues),
          unit: '',
        },
      ]);
      console.log('TEST INFARED SEND', message);
      client.publish(TOPIC_INFARED, message);
    }, 10000);
  });
};

export default testPub;
