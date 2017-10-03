// /* eslint-disable */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    data: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId',
      }
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
    });
  };
  return Review;
};
