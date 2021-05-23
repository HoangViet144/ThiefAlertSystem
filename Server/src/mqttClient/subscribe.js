import mqtt from 'mqtt';
import {} from 'dotenv/config';

const { MQTT_CONNECTION_STRING } = process.env;

export const subscribe = () => {
  const client = mqtt.connect(MQTT_CONNECTION_STRING);

  const topicInfared = 'NPNLab_BBC/feeds/bk-iot-infrared';
  const topicMagnetic = 'NPNLab_BBC/feeds/bk-iot-magnetic';

  try {
    client.on('connect', () => {
      console.log('Subcribe connect OK');
      client.subscribe(topicInfared);
      client.subscribe(topicMagnetic);
    });

    client.on('message', (topic, message) => {
      try {
        const msg = JSON.parse(message)[0];
        console.log(msg);
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
