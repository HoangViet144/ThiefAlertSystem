import {} from 'dotenv/config';
import app from 'app';
import { clientSubscribe } from 'mqttClient';

import testInfared from 'utils/infaredPublisher.js';
import testMagnetic from 'utils/magneticPublisher.js';
import testTime from 'utils/timePublisher.js';
import outputSubscriber from 'utils/outputSubscriber.js';

const { PORT } = process.env;

global.sentNotification = false;
global.systemStatus = 'on';
global.setting = { start: '21:00:00', end: '06:00:00' };

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

clientSubscribe();

// ==== TESTING ONLY ======
outputSubscriber();
testTime();
testInfared();
testMagnetic();
