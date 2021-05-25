import {} from 'dotenv/config';
import app from 'app';
import { clientSubscribe } from 'mqttClient/subscribe.js';

import testInfared from 'utils/infaredPublisher.js';
import testMagnetic from 'utils/magneticPublisher.js';

const { PORT } = process.env;

global.sentNotification = false;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

clientSubscribe();
testInfared();
testMagnetic();
