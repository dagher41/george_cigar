'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment_methods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      payment_profile_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'payment_profiles',
          key: 'id'
        }
      },
      brand: {
        type: Sequelize.STRING(20),
      },
      externalId: {
        type: Sequelize.STRING,
        field: 'external_id'
      },
      expMonth: {
        type: Sequelize.INTEGER,
        field: 'exp_month'
      },
      expYear: {
        type: Sequelize.INTEGER,
        field: 'exp_year'
      },
      lastFour: {
        type: Sequelize.STRING(6),
        field: 'last_four'
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

    await queryInterface.addIndex('payment_methods', ['payment_profile_id']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payment_methods');
    await queryInterface.removeIndex('payment_methods', ['payment_profile_id']);
  }
};