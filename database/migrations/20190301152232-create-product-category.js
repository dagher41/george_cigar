
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'products',
          key: 'id',
        },
        field: 'product_id',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'categories',
          key: 'id',
        },
        field: 'category_id',
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
        return queryInterface.addIndex('product_categories', ['product_id']);
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_categories')
      .then(() => {
        return queryInterface.removeIndex('product_categories', ['product_id']);
      });
  }
};