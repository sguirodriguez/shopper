'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('measures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      uuid: {
        type: Sequelize.STRING,
        unique: true
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'customers',
          key: 'id'
        }
      },
      image_data: {
        type: Sequelize.TEXT,
      },
      image_extension: {
        type: Sequelize.STRING(32),
      },
      value: {
        type: Sequelize.INTEGER
      },
      confirmed_value: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM("water", "gas")
      },
      measure_datetime: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('measures');
  }
};