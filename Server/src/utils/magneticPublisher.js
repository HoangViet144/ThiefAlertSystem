import {} from 'dotenv/config';
import sample from 'lodash/sample';
import mqtt from 'mqtt';

const { MQTT_CONNECTION_STRING } = process.env;

const topicMagnetic = 'NPNLab_BBC/feeds/bk-iot-magnetic';

const client = mqtt.connect(MQTT_CONNECTION_STRING);

const magneticValues = [0, 1];

const testPub = () => {
  client.on('connect', () => {
    console.log('===> Magnetic Publisher is ready <===');

    setInterval(() => {
      const message = JSON.stringify([
        {
          id: '8',
          name: 'MAGNETIC ',
          data: sample(magneticValues),
          unit: '',
        },
      ]);
      console.log('TEST MAGNETIC SEND', message);
      client.publish(topicMagnetic, message);
    }, 5000);
  });
};

export default testPub;
