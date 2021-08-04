import { Router } from 'express';

import {
  offAlert,
  offSystem,
  onSystem,
  getSystemStatus,
  setTimer,
  onAlert,
  offAlertManually,
} from './controllers';
import auth from '../middlewares/auth';

const systemRouter = Router();

systemRouter.use(auth);

systemRouter.get('/off-system', offSystem);
systemRouter.get('/on-system', onSystem);
systemRouter.get('/off-alert', offAlert);
systemRouter.get('/on-alert', onAlert);
systemRouter.get('/status', getSystemStatus);
systemRouter.post('/set-timer', setTimer);
systemRouter.get('/off-alert-manually', offAlertManually);

export default systemRouter;
