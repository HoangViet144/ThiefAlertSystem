import client from 'mqttClient';

const topicSpeaker = 'NPNLab_BBC/feeds/bk-iot-speaker';
const topicLed = 'NPNLab_BBC/feeds/bk-iot-led';
const topicRelay = 'NPNLab_BBC/feeds/bk-iot-relay';

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

const offSystem = (req, res) => {
  client.publish(
    topicRelay,
    JSON.stringify([
      {
        id: 11,
        name: 'RELAY',
        data: 0,
        unit: '',
      },
    ])
  );

  global.sentNotification = false;

  console.log('!!! TURN OFF THE WHOLE SYSTEM !!!');

  res.send('Off SYSTEM');
};

const onSystem = (req, res) => {
  client.publish(
    topicRelay,
    JSON.stringify([
      {
        id: 11,
        name: 'RELAY',
        data: 1,
        unit: '',
      },
    ])
  );

  global.sentNotification = false;

  console.log('!!! SYSTEM IS TURNED ON !!!');

  res.send('ON SYSTEM');
};

export { offAlert, offSystem, onSystem };
