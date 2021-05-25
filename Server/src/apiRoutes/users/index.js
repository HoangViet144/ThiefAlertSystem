import { Router } from 'express';

import authenticateUser from '../middlewares/auth';
import { getProfile } from './controllers';

const userRouter = Router();

userRouter.get('/', authenticateUser, getProfile);

export default userRouter;
