'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductGroupProduct = sequelize.define('ProductGroupProduct', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id'
    },
    productGroupId: {
      type: DataTypes.INTEGER,
      field: 'product_group_id'
    },
    position: {
      type: DataTypes.INTEGER
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
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'product_group_products'
  });
  ProductGroupProduct.associate = function (models) {
    ProductGroupProduct.belongsTo(models.ProductGroup, { as: 'productGroup' });
    ProductGroupProduct.belongsTo(models.Product, { as: 'product' });
  };
  return ProductGroupProduct;
};