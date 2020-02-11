'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('users', 'firstName', 'first_name'),
      queryInterface.renameColumn('users', 'lastName', 'last_name')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('users', 'first_name', 'firstName'),
      queryInterface.renameColumn('users', 'last_name', 'lastName')
    ]);
  }
};
