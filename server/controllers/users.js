/* eslint-disable */
import {User} from '../models';

// const user = models.User;
/**
 * Class Definition for the User Object
 *
 * @export
 * @class User
 */
// export default class User {
  /**
   * Sign Up user (Create new user)
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof User
   */
  module.exports = {
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

    User
      .findOne({
        where: {
          username,
        }
      })
      .then((user) => {
        if (user) {
          return res.status(409).send({message: "Username is already taken" })
        }

      User.create({
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
      .catch(error => { return res.status(400).send(error) })

    // return this;
  }  
}
