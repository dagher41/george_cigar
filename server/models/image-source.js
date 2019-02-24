
module.exports = (sequelize, DataTypes) => {
  const ImageSource = sequelize.define('ImageSource', {
    source: DataTypes.STRING,
    sourceId: {
      type: DataTypes.STRING,
      field: 'source_id'
    },
    payload: DataTypes.TEXT,
    productImageId: {
      type: DataTypes.INTEGER,
      field: 'product_image_id'
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
      tableName: 'image_sources'
    });
  ImageSource.associate = function (models) {
    ImageSource.belongsTo(models.ProductImage)
  };
  return ImageSource;
};