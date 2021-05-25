import {} from 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { JWT_KEY } = process.env;

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      emergencyNumber: {
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            await user.setPassword(user.password);
          }
        },
      },
    }
  );

  User.prototype.toJSON = function toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  User.prototype.genAuthToken = async function genAuthToken() {
    const payload = { user: { id: this.id, fullname: this.fullname } };
    const token = await jwt.sign(payload, JWT_KEY);
    return token;
  };

  User.prototype.setPassword = async function setPassword(rawPassword) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(rawPassword, saltRounds);
  };

  User.prototype.checkPassword = async function checkPassword(rawPassword) {
    return bcrypt.compare(rawPassword, this.password);
  };

  return User;
};
