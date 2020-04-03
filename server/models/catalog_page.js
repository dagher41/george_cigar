'use strict';
module.exports = (sequelize, DataTypes) => {
  const CatalogPage = sequelize.define('CatalogPage', {
    name: DataTypes.TEXT,
    slug: DataTypes.STRING,
    catalogId: {
      type: DataTypes.INTEGER,
      field: 'catalog_id'
    },
    position: DataTypes.INTEGER,
    publicVisible: {
      type: DataTypes.BOOLEAN,
      field: 'public_visible'
    },
    templateId: {
      type: DataTypes.STRING,
      field: 'template_id'
    },
    clientMetadata: {
      type: DataTypes.JSONB,
      field: 'client_metadata'
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'catalog_pages'
  });
  CatalogPage.associate = function (models) {
    CatalogPage.hasMany(models.ProductGroup, { as: 'productGroups', foreignKey: 'catalog_page_id' });

    CatalogPage.hasMany(models.PageProduct, { as: 'pageProducts', foreignKey: 'catalog_page_id' });
    CatalogPage.belongsToMany(models.Product, { through: models.PageProduct, as: 'products' });

    CatalogPage.hasOne(models.MerchantPage, { as: 'merchantPage', foreignKey: 'catalog_page_id' });
  };



  return CatalogPage;
};