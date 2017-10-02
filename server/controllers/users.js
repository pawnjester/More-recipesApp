/* eslint-disable */
// import { User } from '../models';
import models from '../models';
const  jwt = require('jsonwebtoken');


console.log(models);

const user = models.User;
/**
 * Class Definition for the User Object
 *
 * @export
 * @class User
 */
export default class User {
/**
 * Sign Up user (Create new user)
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @returns {object} Class instance
 * @memberof User
 */

  signUp(req, res) {
    const username = req.body.username.trim().toLowerCase();
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;

    if (!username) {
      return res.status(400).send({ error: "You need to fill in your username" })
    } else if (!email) {
      return res.status(400).send({ error: "You need to fill in your email" })
    } else if (!password) {
      return res.status(400).send({ error: "You need to fill in your password" })
    }

    user
      .findOne({
        where: {
          $or: [
            {
              username: {
                $iLike: username
              }
            },
            {
              email: {
                $iLike: email
              }
            }
          ]
        }
      })
      .then((userFound) => {
        if (userFound) {
          return res.status(400).send({error: 'Username already taken'})
        }
        return user.create({
          username,
          email,
          password
        })
          .then(user => {
            const token = user.generateAuthToken();
            return res.header('x-auth', token).status(201)
              .send({
                message: `Welcome to More-Recipes ${user.username}`,
                user
              });
          });
      })
      .catch(error => { return res.status(400).send(error) });
    return this;
  }

  signIn(req,res) {
    const username = req.body.username;

    if(!username) {
      return res.status(401)
      .send({
        status: false, 
        error: "Username cannot be empty"
        });
    } 
    else if (!req.body.password) {
      return res.status(401)
      .send({
        status: false,
        error: "Password field cannot be empty"
        });
    }
    user.findOne({
      where: {
        username,
      }
    })
    .then((userFound) =>{     
      
      if(!userFound) {
        return res.status(401).send({message: "User is not registered"})
      }
      else if(!userFound.validPassword(req.body.password)){
        return res.status(401)
        .send({
          message: "The password is incorrect"
        })
      }
            
      const token = userFound.generateAuthToken();
      res.header('x-auth', token).status(200).send({
      statusCode: 200,
      message: `Welcome back, ${userFound.username}`,
      userFound
    });
      
    })
    .catch(error => {return res.status(400).send(error)})
    return this;
  }

  // me(req,res) {
  //   let token = req.headers['x-access-token'];
  //   if(!token) {
  //     return res.status(401).send({message: "no token provided"})
  //   }
  //   jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
  //   if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  //   user.findById(decoded.id)
  //   .then(user => {
  //     if(!user) {
  //       return res.status(400).send("No user found.");
  //     }
  //     return res.status(200).send(user);

  //   })
  // });
  // }
  me(req, res) {
    const currentUser = req.currentUser;
  return res.status(200).send({ currentUser });
  }
}
