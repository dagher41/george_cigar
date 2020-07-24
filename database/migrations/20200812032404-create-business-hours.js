'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('business_hours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      catalog_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'catalogs',
          key: 'id'
        }
      },
      day_of_week: {
        type: Sequelize.INTEGER
      },
      open_time: {
        type: Sequelize.STRING
      },
      close_time: {
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

    await queryInterface.addIndex('business_hours', ['catalog_id']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('business_hours');
    await queryInterface.removeIndex('business_hours', ['catalog_id']);
  }
};