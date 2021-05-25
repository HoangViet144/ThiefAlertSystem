import express from 'express';
import { login, authenticate } from './controllers';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/', auth, authenticate);
router.post('/', login);

export default router;
