
module.exports = (sequelize, DataTypes) => {
  const ProductTag = sequelize.define('ProductTag', {
    product_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER,
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
      tableName: 'product_tags'
    });
  ProductTag.associate = function (models) {
    ProductTag.belongsTo(models.Product);
    ProductTag.belongsTo(models.Tag);
  };
  return ProductTag;
};