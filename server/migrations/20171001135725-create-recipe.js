module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      ingredients: {
        type: Sequelize.STRING,
      },
      method: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'https://res.cloudinary.com/digr7ls7o/image/upload/v1516455539/no-img_hdhkpi.png'
      },
      upVotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      downVotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }),

  down: queryInterface =>
    queryInterface.dropTable('Recipes'),
};
