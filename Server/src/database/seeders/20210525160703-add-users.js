import {} from 'dotenv/config';
import bcrypt from 'bcrypt';

export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'user@gmail.com',
          fullname: 'Thuan Ngo',
          password: await bcrypt.hash('password123', 10),
          phone: '01932131',
          emergencyNumber: '00012312',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
