
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('image_sources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      source: {
        type: Sequelize.STRING
      },
      source_id: {
        type: Sequelize.STRING
      },
      payload: {
        type: Sequelize.TEXT
      },
      productImageId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'product_images',
          key: 'id'
        },
        field: 'product_image_id'
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
    })
      .then(() => {
        return queryInterface.addIndex('image_sources', ['product_image_id']);
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('image_sources')
      .then(() => {
        return queryInterface.removeIndex('image_sources', ['product_image_id']);
      });
  }
};