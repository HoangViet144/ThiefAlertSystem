import { } from 'dotenv/config';
import app from 'app';
import { subscribe } from 'mqttClient/subscribe.js';

import testInfared from 'utils/infaredPublisher.js';
import testMagnetic from 'utils/magneticPublisher.js';

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

subscribe();
testInfared();
testMagnetic();
