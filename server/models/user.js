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
  User.associate = (models) => {
    User.hasMany(models.Recipe, { foreignKey: 'userId' });
  };

  return User;
};
