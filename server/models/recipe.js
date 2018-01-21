/* eslint-disable */
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
    },
    method: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'https://res.cloudinary.com/digr7ls7o/image/upload/v1516455539/no-img_hdhkpi.png'
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 0
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    }
  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
    });
    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
    });
  };
  return Recipe;
};
