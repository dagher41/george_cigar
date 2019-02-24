
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_tags', {
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
      tagId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'tags',
          key: 'id',
        },
        field: 'tag_id',
      }
    })
      .then(() => {
        return queryInterface.addIndex('product_tags', ['product_id']);
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_tags')
      .then(() => {
        return queryInterface.removeIndex('product_tags', ['product_id']);
      });
  }
};