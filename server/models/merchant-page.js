
module.exports = (sequelize, DataTypes) => {
  const MerchantPage = sequelize.define('MerchantPage', {
    catalogPageId: {
      type: DataTypes.INTEGER,
      field: 'catalog_page_id'
    },
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    position: DataTypes.INTEGER,
    classification: DataTypes.STRING,
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
    tableName: 'merchant_pages'
  });

  MerchantPage.prototype.getMerchantPath = function () {
    switch (this.classification) {
      case MerchantPage.CLASSIFICATION_TYPES.productListPage:
        return `/merchant/pages/${this.slug}`;
      case MerchantPage.CLASSIFICATION_TYPES.merchantsPage:
      case MerchantPage.CLASSIFICATION_TYPES.catalogsPage:
        return `/admin/${this.slug}`
      default:
        return `/merchant/${this.slug}`;
    }
  };

  MerchantPage.associate = function (models) {
    MerchantPage.belongsTo(models.CatalogPage, { as: 'catalogPage', foreignKey: 'catalog_page_id' })
  };

  MerchantPage.CLASSIFICATION_TYPES = {
    productListPage: 'product_list_page',
    messagesPage: 'message_page',
    reviewsPage: 'reviews_page',
    genericPage: 'generic_page',
    merchantsPage: 'merchants_page',
    catalogsPage: 'catalogs_page'
  }
  return MerchantPage;
};