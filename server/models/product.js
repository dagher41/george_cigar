
module.exports = (sequelize, DataTypes) => {
  const STATUS_CODES = {
    active: 1,
    inactive: 2
  };
  const Product = sequelize.define('Product', {
    title: DataTypes.TEXT,
    body: DataTypes.TEXT,
    status: DataTypes.INTEGER,
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
    scopes: {
      active: {
        where: {
          status: STATUS_CODES.active
        }
      }
    },
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'products'
  });
  Product.associate = function (models) {
    Product.hasMany(models.ProductImage, { as: 'productImages' });
    Product.hasMany(models.ProductGroupProduct, { as: 'productGroupProducts', foreignKey: 'product_id' });
    Product.belongsToMany(models.ProductGroup, { through: models.ProductGroupProduct, as: 'productGroups', otherKey: 'product_group_id' });
    Product.hasMany(models.PageProduct, { as: 'pageProducts' });
    Product.belongsToMany(models.CatalogPage, { through: models.PageProduct, as: 'pages', otherKey: 'catalog_page_id' });
  };
  return Product;
};