import {} from 'dotenv/config';
import mqtt from 'mqtt';

const { MQTT_CONNECTION_STRING } = process.env;

const topicSpeaker = 'NPNLab_BBC/feeds/bk-iot-speaker';
const topicLed = 'NPNLab_BBC/feeds/bk-iot-led';

const client = mqtt.connect(MQTT_CONNECTION_STRING);

const output = () => {
  client.on('connect', () => {
    console.log('===> Output devices is ready <===');
    client.subscribe(topicSpeaker);
    client.subscribe(topicLed);
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
