'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'categories',
      'position',
      Sequelize.INTEGER,
    );
    await queryInterface.addColumn(
      'categories',
      'public_visible',
      Sequelize.BOOLEAN
    );
    await queryInterface.addColumn(
      'categories',
      'template_id',
      Sequelize.STRING
    )
    await queryInterface.addColumn(
      'categories',
      'client_metadata',
      Sequelize.JSONB
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'categories',
      'position'
    )
    await queryInterface.removeColumn(
      'categories',
      'public_visible'
    )
    await queryInterface.removeColumn(
      'categories',
      'template_id'
    )
    await queryInterface.removeColumn(
      'categories',
      'client_metadata'
    )
  }
};
