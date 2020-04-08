'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'user_catalogs',
      'role_code',
      Sequelize.INTEGER
    );

    await queryInterface.addConstraint('user_catalogs', ['role_code'], {
      type: 'FOREIGN KEY',
      name: 'FK_role_code_user_catalogs',
      references: {
        table: 'roles',
        field: 'code',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('user_catalogs', 'FK_role_code_user_catalogs');

    await queryInterface.removeColumn('user_catalogs', 'role_code')
  }
};
