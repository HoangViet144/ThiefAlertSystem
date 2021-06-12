module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SystemInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ON',
      },
      setting: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: { start: '21:00:00', end: '06:00:00' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SystemInfos');
  },
};
