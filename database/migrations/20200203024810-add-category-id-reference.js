
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'categories',
      'catalog_id',
      Sequelize.INTEGER,
    )
    await queryInterface.addConstraint('categories', ['catalog_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_catalog_id_categories',
      references: {
        table: 'catalogs',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });

    await queryInterface.addColumn(
      'messages',
      'catalog_id',
      Sequelize.INTEGER,
    )
    await queryInterface.addConstraint('messages', ['catalog_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_catalog_id_messages',
      references: {
        table: 'catalogs',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });

    await queryInterface.addColumn(
      'reviews',
      'catalog_id',
      Sequelize.INTEGER,
    )
    await queryInterface.addConstraint('reviews', ['catalog_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_catalog_id_reviews',
      references: {
        table: 'catalogs',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'categories',
      'catalog_id'
    );
    await queryInterface.removeColumn(
      'messages',
      'catalog_id'
    );
    await queryInterface.removeColumn(
      'reviews',
      'catalog_id'
    );
  }
};
