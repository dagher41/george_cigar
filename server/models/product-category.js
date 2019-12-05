
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id'
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
      tableName: 'product_categories'
    });
  ProductCategory.associate = function (models) {
    ProductCategory.belongsTo(models.Product);
    ProductCategory.belongsTo(models.Category);
  };
  return ProductCategory;
};