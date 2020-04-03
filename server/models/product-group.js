'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductGroup = sequelize.define('ProductGroup', {
    title: DataTypes.TEXT,
    subHeading: {
      type: DataTypes.TEXT,
      field: 'sub_heading'
    },
    body: DataTypes.TEXT,
    catalogPageId: {
      type: DataTypes.INTEGER,
      field: 'catalog_page_id'
    },
    position: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'product_groups'
  });
  ProductGroup.associate = function (models) {
    ProductGroup.belongsTo(models.CatalogPage, { as: 'page', foreignKey: 'catalog_page_id' });

    ProductGroup.hasMany(models.ProductGroupProduct, { as: 'productGroupProducts', foreignKey: 'product_group_id' });
    ProductGroup.belongsToMany(models.Product, { through: models.ProductGroupProduct, as: 'products' })
  };
  return ProductGroup;
};

