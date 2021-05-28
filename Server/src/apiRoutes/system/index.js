import { Router } from 'express';

import { offAlert, offSystem, onSystem } from './controllers';
import auth from '../middlewares/auth';

const systemRouter = Router();

systemRouter.use(auth);

systemRouter.get('/off-system', offSystem);
systemRouter.get('/on-system', onSystem);
systemRouter.get('/off-alert', offAlert);

export default systemRouter;