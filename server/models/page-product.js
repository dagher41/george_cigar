
module.exports = (sequelize, DataTypes) => {
  const PageProduct = sequelize.define('PageProduct', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id'
    },
    catalogPageId: {
      type: DataTypes.INTEGER,
      field: 'catalog_page_id'
    },
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      field: 'updated_at'
    }
  }, {
    freezeTableName: true,
    underscored: true,
    tableName: 'page_products'
  });
  PageProduct.associate = function (models) {
    PageProduct.belongsTo(models.Product, { as: 'product', foreignKey: 'product_id' });
    PageProduct.belongsTo(models.CatalogPage, { as: 'page', foreignKey: 'catalog_page_id' });
  };
  return PageProduct;
};