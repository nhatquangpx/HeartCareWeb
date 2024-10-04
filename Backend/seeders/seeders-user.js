'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      // email: 'thucfc2002@gmail.com',
      // password: '123456',
      // firstName: 'Thuc',
      // lastName: 'Skin',
      // address: 'Đà Nẵng',
      // phoneNumber: '0969794458',
      // gender: 1,
      // image: null,
      // roleId: 'ADMIN'
      // positionId: '',
      // createdAt: new Date(),
      // updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
