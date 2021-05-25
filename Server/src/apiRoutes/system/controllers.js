import client from 'mqttClient';

const topicSpeaker = 'NPNLab_BBC/feeds/bk-iot-speaker';
const topicLed = 'NPNLab_BBC/feeds/bk-iot-led';

const offAlert = (req, res) => {
  client.publish(
    topicSpeaker,
    JSON.stringify([
      {
        id: 3,
        name: 'SPEAKER',
        data: 0,
        unit: '',
      },
    ])
  );

  client.publish(
    topicLed,
    JSON.stringify([
      {
        id: 1,
        name: 'LED',
        data: 0,
        unit: '',
      },
    ])
  );

  global.sentNotification = false;

  console.log('===> TURN OFF ALERT <===');

  res.send('Off Alert');
};

export { offAlert };
