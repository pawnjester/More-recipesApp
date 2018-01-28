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
   * @description Signup User record
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @memberof User
   *
   * @returns {object} Class instance
   */
  signUp(req, res) {
    const { email, username, password } = req.body;

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
        if (userFound) {
          return res.status(409).json({ statusCode: 409, error: 'Username or email is already in use' });
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
            }));
      })
      .catch(() => res.status(400).json({ statusCode: 400, error: 'Error creating an account' }));
    return this;
  }

  /**
   * @description Signin User record
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @memberof User
   *
   * @returns {object} Class instance
   */
  signIn(req, res) {
    const { email, username } = req.body;
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
          return res.status(401).json({ statusCode: 401, message: 'Invalid credentials' });
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
      .catch(() => res.status(500).json({ statusCode: 500, error: 'Error signing in' }));
    return this;
  }

  /**
   * @description Current User record
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @memberof User
   *
   * @returns {object} Class instance
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
      .catch(error => res.status(500).json({
        statusCode: 500,
        error: error.message
      }));
    return this;
  }
  /**
 * @description Edit User record
 *
 * @param {any} req - HTTP Request
 *
 * @param {any} res - HTTP Response
 *
 * @memberof User
 *
 * @returns {object} Class instance
 */
  editUser(req, res) {
    const { currentUser } = req;
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
          return res.status(404).json({
            error: 'User not found',
          });
        }
        return user.findOne({
          where: {
            $or: [
              {
                username: req.body.username,
              },
              {
                email: req.body.email,
              }
            ]
          }
        }).then((CheckUser) => {
          if (CheckUser) {
            return res.status(400)
              .json({
                statusCode: 400,
                error: 'Username or email already taken'
              });
          }
          return userFound.update({
            username: req.body.username || userFound.name,
            email: req.body.email || userFound.email,
            profileImg: req.body.profileImg || userFound.profileImg,
          }).then(() => res.status(201).json({ statusCode: 201, userFound }));
        });
      })
      .catch(() => res.status(500).json({
        statusCode: 500,
        error: 'Error editing the user'
      }));
    return this;
  }
  /**
 * @description Check email record
 *
 * @param {any} req - HTTP Request
 *
 * @param {any} res - HTTP Response
 *
 * @memberof User
 *
 * @returns {object} Class instance
 */
  checkEmail(req, res) {
    const { email } = req.body;
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
      .catch(() => res.status(500)
        .json({ statusCode: 500, error: 'Server error' }));
    return this;
  }
  /**
 * @description reset password
 *
 * @param {any} req - HTTP Request
 *
 * @param {any} res - HTTP Response
 *
 * @memberof User
 *
 * @returns {object} Class instance
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
            .then(() => res.status(200)
              .json({ message: 'Password reset successful ' }));
        } else {
          return res.status(403)
            .json({ Message: 'You`re unauthorized to perform this action' });
        }
      })
      .catch(() => res.status(500)
        .json({ statusCode: 500, error: 'Server error' }));
    return this;
  }
  /**
 *@description Change users password
 *
 * @param {any} req - HTTP Request
 *
 * @param {any} res - HTTP Response
 *
 * @memberof User
 *
 * @returns {object} Class instance
 */
  changePassword(req, res) {
    const { oldPassword, password } = req.body;
    const { currentUser } = req;
    user.findOne({
      where: {
        id: currentUser.id
      }
    })
      .then((userFound) => {
        if (!userFound) {
          return res.status(400).json({ statusCode: 400, message: 'User not found' });
        } else if (!userFound.validPassword(oldPassword)) {
          return res.status(400).json({ statusCode: 400, error: 'Invalid password' });
        } else if (password === oldPassword) {
          return res.status(400).json({ statusCode: 400, error: 'New Password is the same as the old password' });
        }
        const salt = bcrypt.genSaltSync(10);
        const newPassword = bcrypt.hashSync(password, salt);
        userFound.update({
          password: newPassword,
        })
          .then(() => res.status(201).json({ statusCode: 201, message: 'Password changed' }));
      })
      .catch(() => res.status(500).json({ statusCode: 500, error: 'Error changing password' }));
    return this;
  }
}
