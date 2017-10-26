/* eslint-disable */
import models from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
const user = models.User;

let authenticate =  (req, res, next) => {

  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(401).send({
      success: false, 
      message: 'Unauthorized user, You need to sign in.'      
    });
  }
  // verifies secret and checks exp
  return jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
    if (err) {
      return res.status(401).json({success: false, message: 'Failed to authenticate token'});
    } 
    else {  
      user.findById(decoded.id).then(user => {
        if(!user) {
          return res.status(401).send({error: 'User cannot be verified'})
        }
        req.currentUser = user;
        next()
      })   
      
    }
  })
};

export default authenticate;