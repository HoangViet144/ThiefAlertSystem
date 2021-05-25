import { Router } from 'express';

import { offAlert } from './controllers';
const systemRouter = Router();

systemRouter.use(auth);

systemRouter.get('/off-alert', offAlert);

export default systemRouter;
