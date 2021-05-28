import bcrypt from 'bcrypt';
import { User } from 'models';

const authenticate = async (req, res) => res.send(req.user);

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user === null) {
      return res.status(400).send({ error: 'Invalid credentials!' });
    }

    const isValidCredential = await user.checkPassword(password);
    if (!isValidCredential) {
      return res.status(400).send({ error: 'Invalid credentials!' });
    }
    const token = await user.genAuthToken();
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send({
      error: 'Login failed due to internal server error. Please try again!',
    });
  }
};

export { authenticate, login };
