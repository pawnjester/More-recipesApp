/* eslint-disable */
const {User} = require('../models');
const  jwt = require('jsonwebtoken');

let authenticate =  (req, res, next) => {

  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({
      success: false, 
      message: 'No token provided.'      
    });
  }
  // verifies secret and checks exp
  return jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
    if (err) {
      return res.json({success: false, message: 'Failed to authenticate token'});
    } 
    else {  
      User.findById(decoded.id).then(user => {
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