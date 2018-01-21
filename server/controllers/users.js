import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';
import mailer from '../helper/mailer';

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
   *
   * @returns {object} Class instance
   *
   * @memberof User
   */
  signUp(req, res) {
    let email;
    let username;
    let password;
    console.log('req.body>>', req.body);
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const whiteSpace = /\s/;

    if (req.body.email) {
      email = req.body.email.trim();
    }

    if (req.body.username) {
      username = req.body.username.trim();
    }

    if (req.body.password) {
      password = req.body.password;
    }

    if (!req.body.username && !req.body.password && !req.body.email) {
      return res.status(406).json({ statusCode: 406, error: 'Please fill in the required details' });
    }

    if (!username || username.length < 6) {
      return res.status(406).json({ statusCode: 406, error: 'You need to fill in your username with a minimum length of 6' });
    } else if (!email) {
      return res.status(406).json({ statusCode: 406, error: 'You need to fill in your email' });
    } else if (!filter.test(email)) {
      return res.status(406).json({ statusCode: 406, error: 'Invalid email address!' });
    } else if (!req.body.password) {
      return res.status(406).json({ statusCode: 406, error: 'You need to fill in the password' });
    } else if (whiteSpace.test(password)) {
      return res.status(422).json({ statusCode: 406, error: 'Password cannot contain spaces' });
    } else if (password.length < 6) {
      return res.status(422).json({ statusCode: 406, error: 'You need to fill in a password with a minimum length of 6' });
    }

    user
      .findOne({
        where: {
          $or: [
            {
              username: {
                $like: username,
              },
            },
            {
              email: {
                $like: email,
              },
            },
          ],
        },
      })
      .then((userFound) => {
        let errorname;
        if (userFound) {
          errorname = 'Username or email is already in use';
          return res.status(409).json({ statusCode: 409, error: errorname });
        }
        return user.create({
          username,
          email,
          password,
        })
          .then(user => res.status(201)
            .json({
              statusCode: 201,
              message: `Welcome to More-Recipes ${user.username}`,
              user,
            }))
          .catch(e => res.status(400).json(e));
      })
      .catch(error => res.status(400).json(error));
    return this;
  }

  /**
   * Signin User record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @returns {object} Class instance
   *
   * @memberof User
   */
  signIn(req, res) {
    let email;
    let username;

    if (req.body.email) {
      email = req.body.email.trim();
    }

    if (req.body.username) {
      username = req.body.username.trim();
    }

    if (!req.body.email && !req.body.username) {
      return res.status(406).json({ statusCode: 406, error: 'Email or username cannot be empty' });
    }
    if (!req.body.password) {
      return res.status(406)
        .json({
          statusCode: 406,
          error: 'Password field cannot be empty',
        });
    }
    user.findOne({
      where: {
        $or: [
          {
            username: {
              $iLike: username,
            },
          },
          {
            email: {
              $iLike: email,
            },
          },
        ],
      },
    })
      .then((userFound) => {
        if (!userFound) {
          return res.status(401).json({ statusCode: 401, message: 'User is not registered' });
        } else if (!userFound.validPassword(req.body.password)) {
          return res.status(401)
            .json({
              statusCode: 401,
              message: 'Invalid credentials',
            });
        }
        const token = userFound.generateAuthToken();
        res.status(200).json({
          statusCode: 200,
          message: `Welcome back, ${userFound.username}`,
          userFound,
          token,
        });
      })
      .catch(error => res.status(400).json(error));
    return this;
  }

  /**
   * Current User record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @returns {object} Class instance
   *
   * @memberof User
   */
  me(req, res) {
    const { currentUser } = req;
    user
      .findOne({
        where: {
          id: currentUser.id,
        },
      })
      .then((userFound) => {
        if (!user) {
          return res.status(404).json({
            error: 'No currentUser',
          });
        }
        return res.status(200).json(userFound);
      })
      .catch(error => res.status(404).json({ error: error.message }));
    return this;
  }
  /**
 * Edit User record
 *
 * @param {any} req - HTTP Request
 * @param {any} res - HTTP Response
 * @returns {object} Class instance
 * @memberof User
 */
  editUser(req, res) {
    const { currentUser } = req;
    console.log('body', req.body);
    user.findOne({
      where: {
        $or: [
          {
            username: currentUser.username,
          },
          {
            email: currentUser.email,
          },
        ],
      },
    })
      .then((userFound) => {
        if (!userFound) {
          return res.status(404).send({
            error: 'User not found',
          });
        }
        return userFound.update({
          username: req.body.username || userFound.name,
          email: req.body.email || userFound.email,
          profileImg: req.body.profileImg || userFound.profileImg,
        })
          .then(() => res.status(201).json({ statusCode: 201, userFound }))
          .catch(error => res.status(500).json(error));
      })
      .catch(error => res.status(500).json(error));
    return this;
  }
  /**
 * Check email record
 *
 * @param {any} req - HTTP Request
 * @param {any} res - HTTP Response
 * @returns {object} Class instance
 * @memberof User
 */
  checkEmail(req, res) {
    const { email } = req.body;
    console.log(req.body);
    user.findOne({
      where: {
        email,
      },
    })
      .then((isUser) => {
        if (!isUser) {
          return res.status(404).json({ error: 'User not found' });
        }
        const token = jwt.sign(
          { id: isUser.dataValues.id }, process.env.SECRET_KEY,
          { expiresIn: 259200 },
        );
        isUser.update({ token })
          .then(() => {
            const url = `http://localhost:3000/auth/reset_password/${token}`;
            const { username } = isUser.dataValues;
            mailer(url, username, email, res);
          });
      })
      .catch(() => res.status(500).json({ error: 'Server error' }));
    return this;
  }
  /**
 * reset password
 *
 * @param {any} req - HTTP Request
 * @param {any} res - HTTP Response
 * @returns {object} Class instance
 * @memberof User
 */
  resetPassword(req, res) {
    const { password } = req.body;
    const { currentUser } = req;
    user.findOne({
      where: {
        id: currentUser.id,
      },
    })
      .then((isUser) => {
        if (!isUser) {
          return res.status(404).json({ error: 'User not found' });
        }
        if (isUser.dataValues.token === req.headers['x-access-token']) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);
          isUser.update({
            token: null,
            password: hash,
          })
            .then(() => res.status(200).json({ message: 'Password reset successful ' }));
        } else {
          return res.status(403).json({ Message: 'You`re unauthorized to perform this action' });
        }
      })
      .catch(() => res.status(500).json({ error: 'Server error' }));
    return this;
  }
}
