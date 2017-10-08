
module.exports = (sequelize, DataTypes) => {
  const Downvote = sequelize.define('Downvote', {
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId',
      }
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
  Downvote.associate = (models) => {
    Downvote.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Downvote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };
  return Downvote;
};

