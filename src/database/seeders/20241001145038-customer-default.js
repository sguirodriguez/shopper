'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customers', [
      {
        name: 'Tech Solutions',
        document: '12345678910',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Alpha Consulting',
        document: '10987654321',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Green Energy Inc.',
        document: '56473829100',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {});
  },
};
