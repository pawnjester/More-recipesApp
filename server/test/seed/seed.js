import jwt from 'jsonwebtoken';
import models from '../../models';
const user = models.User;


export const generateToken = (id) => {
  return jwt.sign({ id, access: 'auth' },
    process.env.SECRET_KEY, { expiresIn: 24 * 60 * 60 }).toString();
};

export const seedUsers = {
  registered: [
    {
      id: 101,
      username: 'user111',
      password: 'user111password',
      email: 'user111@example.com'
    },
    {
      id: 102,
      username: 'user112',
      password: 'user112password',
      email: 'user112@example.com'
    },
    {
      id: 103,
      username: 'user113',
      password: 'user113password',
      email: 'user113@example.com'
    },
  ]
}
