import dotenv from 'dotenv';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6
      }
    },
    profileImg: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'https://res.cloudinary.com/digr7ls7o/image/upload/v1515766369/no-photo-male_ugp3qv.jpg'
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  });
  // salt and hash passwords before creating users
  User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  });


  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Instance method to generate token for the user
  User.prototype.generateAuthToken = function generateAuthToken() {
    const user = this;
    const access = 'auth';
    const token = jwt.sign(
      { id: user.id, access },
      process.env.SECRET_KEY,
      // secret key to expire in three days
      { expiresIn: 259200 }
    ).toString();
    return token;
  };

  // Instance method to prevent password from
  // being sent to client.
  User.prototype.toJSON = function toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };
  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId'
    });
  };
  return User;
};
