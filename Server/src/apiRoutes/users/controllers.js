import { User } from 'models';

export const getProfile = (req, res) => {
  res.send(req.user);
};
