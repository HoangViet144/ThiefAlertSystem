import mqtt from 'mqtt';
import {} from 'dotenv/config';

const { MQTT_CONNECTION_STRING } = process.env;

const topicInfared = 'NPNLab_BBC/feeds/bk-iot-infrared';
const topicMagnetic = 'NPNLab_BBC/feeds/bk-iot-magnetic';
const topicSpeaker = 'NPNLab_BBC/feeds/bk-iot-speaker';
const topicLed = 'NPNLab_BBC/feeds/bk-iot-led';

const client = mqtt.connect(MQTT_CONNECTION_STRING);

const turnOnAlert = () => {
  console.log('TURN ON ALERT');
  const speakerOnMsg = JSON.stringify([
    {
      id: 3,
      name: 'SPEAKER',
      data: 1020,
      unit: '',
    },
  ]);

  const ledOnMsg = JSON.stringify([
    {
      id: 1,
      name: 'LED',
      data: 1,
      unit: '',
    },
  ]);

  client.publish(topicSpeaker, speakerOnMsg);
  client.publish(topicLed, ledOnMsg);

  sendNotification();
};

const sendNotification = () => {
  if (!global.sentNotification) {
    console.log('Send notification via firebase to User');
    global.sentNotification = true;
  }
};

export const clientSubscribe = () => {
  try {
    client.on('connect', () => {
      console.log('Subcribe connect OK');
      client.subscribe(topicInfared);
      client.subscribe(topicMagnetic);
    });

    client.on('message', (topic, message) => {
      try {
        const msg = JSON.parse(message)[0];
        console.log('MSG recieved', msg);

        if (
          (msg.name === 'INFARED' && msg.data.includes('1')) ||
          (msg.name === 'MAGNETIC' && msg.data === 1)
        ) {
          turnOnAlert();
        }
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export default client;
