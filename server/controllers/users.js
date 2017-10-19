// /* eslint-disable */

import models from '../models';

import dotenv from 'dotenv';

const jwt = require('jsonwebtoken');

dotenv.config();

const user = models.User;
/**
 * Class Definition for the User Object
 *
 * @export
 * @class User
 */
export default class User {
  /**
   * Signup User record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof User
   */
  signUp(req, res) {
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const username = req.body.username.trim().toLowerCase();
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;


    if (username.length < 6) {
      return res.status(400).json({ error: 'You need to fill in your username with a minimum length of 6' });    
    } else if (!email) {
      return res.status(400).json({ error: 'You need to fill in your email' });
    } else if (!filter.test(email)) {
      return res.status(400).json({ message: 'Invalid email address!' });

    } else if (password.length < 6) {
      return res.status(400).json({ error: 'You need to fill in a password with a minimum length of 6' });

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
        let errorname;
        let errormail;
        if (userFound) {
          if (userFound.email === email) {
            errormail = 'Email is already in use';
          }
          if (userFound.username === username) {
            errorname = 'Username is already in use';
          }
          return res.status(400).json({ statusCode: 400, errorname, errormail });
        }
        return user.create({
          username,
          email,
          password
        })
          .then((user) => {
            const token = user.generateAuthToken();
            return res.header('x-auth', token).status(201)
              .json({
                message: `Welcome to More-Recipes ${user.username}`,
                user
              });
          })
          .catch((e) => { return res.status(400).json(e)});
      })
      .catch((error) => { return res.status(400).json(error)});
    return this;
  }

  /**
   * Signin User record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof User
   */
  signIn(req, res) {
    const username = req.body.username;

    if (!username) {
      return res.status(401)
        .json({
          status: false,
          error: 'Username cannot be empty'
        });
    } else if (!req.body.password) {
      return res.status(401)
        .json({
          status: false,
          error: 'Password field cannot be empty'
        });
    }
    user.findOne({
      where: {
        username,
      }
    })
      .then((userFound) => {
        if (!userFound) {
          return res.status(401).json({ message: 'User is not registered' });
        } else if (!userFound.validPassword(req.body.password)) {
          return res.status(401)
            .json({
              message: 'The password is incorrect'
            });
        }
        const token = userFound.generateAuthToken();
        res.header('x-auth', token).status(200).json({
          statusCode: 200,
          message: `Welcome back, ${userFound.username}`,
          userFound
        });
      })
      .catch((error) => { return res.status(400).json(error) });
    return this;
  }

  /**
   * Current User record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof User
   */
  me(req, res) {
    const currentUser = req.currentUser;
    res.status(200).json({ currentUser });
    return this;
  }
}
