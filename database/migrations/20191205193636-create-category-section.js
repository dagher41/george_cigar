'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('category_sections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
      sub_heading: {
        type: Sequelize.TEXT
      },
      body: {
        type: Sequelize.TEXT
      },
      position: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },      
      category_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'categories',
          key: 'id'
        },
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
    return queryInterface.dropTable('category_sections');
  }
};