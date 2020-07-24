'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('catalogs', 'business_hours');
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve();
  }
};
