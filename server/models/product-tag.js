
module.exports = (sequelize, DataTypes) => {
  const ProductTag = sequelize.define('ProductTag', {
    product_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
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