'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('catalogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      hostname: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.JSONB
      },
      social: {
        type: Sequelize.JSONB
      },
      contact: {
        type: Sequelize.JSONB
      },
      business_hours: {
        type: Sequelize.JSONB
      },
      logo_src: {
        type: Sequelize.STRING
      },
      favicon_prefix: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        field: 'updated_at'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('catalogs');
  }
};