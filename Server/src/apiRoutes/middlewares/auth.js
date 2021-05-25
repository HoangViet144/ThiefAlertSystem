import jwt from 'jsonwebtoken';

import { User } from 'models';

const { JWT_KEY } = process.env;

export default async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.decode(token, JWT_KEY);
    const userId = decoded.user.id;
    try {
      req.user = await User.findByPk(userId);
    } catch (err) {
      return res.status(500).send({ error: 'Internal server error!' });
    }
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is not valid' });
  }
};
