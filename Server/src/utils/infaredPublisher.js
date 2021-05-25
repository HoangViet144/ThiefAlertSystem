import {} from 'dotenv/config';
import sample from 'lodash/sample';
import mqtt from 'mqtt';

const { MQTT_CONNECTION_STRING } = process.env;

const topicInfared = 'NPNLab_BBC/feeds/bk-iot-infrared';

const client = mqtt.connect(MQTT_CONNECTION_STRING);

const infaredValues = ['00', '01', '10', '11'];

const testPub = () => {
  client.on('connect', () => {
    console.log('===> Infared Publisher is ready <===');

    setInterval(() => {
      const message = JSON.stringify([
        {
          id: '6',
          name: 'INFRARED ',
          data: sample(infaredValues),
          unit: '',
        },
      ]);
      console.log('TEST INFARED SEND', message);
      client.publish(topicInfared, message);
    }, 5000);
  });
};

export default testPub;
