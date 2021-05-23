module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Datas', [
      {
        magnetic: true,
        infared: '11',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Datas', null, {});
  },
};
