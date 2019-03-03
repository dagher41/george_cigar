
module.exports = (sequelize, DataTypes) => {
  const Integration = sequelize.define('Integration', {
    source: DataTypes.STRING,
    sourceUserId: {
      type: DataTypes.STRING,
      field: 'source_user_id'
    },
    accessToken: {
      type: DataTypes.TEXT,
      field: 'access_token'
    },
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
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      tableName: 'integrations'
    });
  Integration.associate = function (models) {
    // associations can be defined here
  };
  return Integration;
};