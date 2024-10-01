'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()); 
    return queryInterface.bulkInsert('measures', [
      {
        uuid: '9469ae8d-e744-4604-b046-e7f22b3984ea' ,
        customer_id: 1,
        image_data: '',
        value: '445432',
        confirmed_value: '458344',
        type: 'water',
        measure_datetime: lastMonth, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid: 'd1491d14-4ea5-4878-83d4-03dad8e77afc' ,
        customer_id: 2,
        image_data: '',
        value: '322333',
        confirmed_value: '394888',
        type: 'gas',
        measure_datetime: lastMonth, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid: '9a14c34b-6e86-4bdc-9736-f4359c930118' ,
        customer_id: 3,
        image_data: '',
        value: '322333',
        confirmed_value: '394888',
        type: 'water',
        measure_datetime: lastMonth, 
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('measures', null, {});
  },
};
