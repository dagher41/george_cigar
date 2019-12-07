'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategorySectionProduct = sequelize.define('CategorySectionProduct', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id'
    },
    categorySectionId: {
      type: DataTypes.INTEGER,
      field: 'category_section_id'
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
    tableName: 'category_section_products'
});
  CategorySectionProduct.associate = function(models) {
    // associations can be defined here
    CategorySectionProduct.belongsTo(models.CategorySection);
    CategorySectionProduct.belongsTo(models.Product);
  };
  return CategorySectionProduct;
};