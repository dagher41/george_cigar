
module.exports = (sequelize, DataTypes) => {
  const STATUS_CODES = {
    active: 1,
    inactive: 2
  };

  const ProductImage = sequelize.define('ProductImage', {
    url: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id'
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
      tableName: 'product_images'
    });
  ProductImage.associate = function (models) {
    ProductImage.belongsTo(models.Product);
  };
  return ProductImage;
};