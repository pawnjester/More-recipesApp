import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models';

dotenv.config();
const user = models.User;

const authenticate = (req, res, next) => {
  const token = req.body.token
  || req.query.token || req.headers['x-access-token']
  || req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized user, You need to sign in.'
    });
  }
  return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Failed to authenticate token' });
    }
    user.findById(decoded.id).then((user) => {
      if (!user) {
        return res.status(401).json({
          error: 'User cannot be verified'
        });
      }
      req.currentUser = user;
      next();
    });
  });
};

export default authenticate;
