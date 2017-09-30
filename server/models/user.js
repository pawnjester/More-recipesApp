/** User database model/association
 * @exports User
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} The User model
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

   //salt and hash passwords before creating users 
  User.beforeCreate((user, options) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
});

  //compare the hash password to the password given
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  //Instance method to generate token for the user
  User.prototype.generateAuthToken = function generateAuthToken() {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({id: user.id, access},
     process.env.SECRET_KEY,
     { expiresIn: Math.floor(new Date().getTime()/1000) + 7*24*60*60 }).toString();    
    return token;

  }

  // Instance method to prevent password from
  // being sent to client.
  User.prototype.toJSON = function toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };
  User.associate = (models) => {
    User.hasMany(models.Recipe, { foreignKey: 'userId' });
  };

  return User;
};
