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
    const username = req.body.username.trim().toLowerCase();
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;

    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!username) {
      return res.status(400).send({ error: 'You need to fill in your username' });
    } else if (!email) {
      return res.status(400).send({ error: 'You need to fill in your email' });
    } else if (!filter.test(email)) {
      return res.status(400).json({ message: 'Invalid email address!' });
    } else if (!password) {
      return res.status(400).send({ error: 'You need to fill in your password' });
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
          return res.status(400).send({ error: 'Username already taken' });
        }
        return user.create({
          username,
          email,
          password
        })
          .then((user) => {
            const token = user.generateAuthToken();
            return res.header('x-auth', token).status(201)
              .send({
                message: `Welcome to More-Recipes ${user.username}`,
                user
              });
          })
          .catch((e) => { return res.status(400).send(e)});
      })
      .catch((error) => { return res.status(400).send(error)});
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
        .send({
          status: false,
          error: 'Username cannot be empty'
        });
    } else if (!req.body.password) {
      return res.status(401)
        .send({
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
          return res.status(401).send({ message: 'User is not registered' });
        } else if (!userFound.validPassword(req.body.password)) {
          return res.status(401)
            .send({
              message: 'The password is incorrect'
            });
        }
        const token = userFound.generateAuthToken();
        res.header('x-auth', token).status(200).send({
          statusCode: 200,
          message: `Welcome back, ${userFound.username}`,
          userFound
        });
      })
      .catch((error) => { return res.status(400).send(error) });
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
    res.status(200).send({ currentUser });
    return this;
  }
}
