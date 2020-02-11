module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('categories', 'catalog_pages');
    await queryInterface.renameTable('category_sections', 'product_groups');
    await queryInterface.renameTable('product_categories', 'page_products');
    await queryInterface.renameTable('merchant_categories', 'merchant_pages');
    await queryInterface.renameTable('category_section_products', 'product_group_products');

    await queryInterface.renameColumn('merchant_pages', 'category_id', 'catalog_page_id');
    await queryInterface.renameColumn('product_groups', 'category_id', 'catalog_page_id');
    await queryInterface.renameColumn('product_group_products', 'category_section_id', 'product_group_id');
    await queryInterface.renameColumn('page_products', 'category_id', 'catalog_page_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('page_products', 'catalog_page_id', 'category_id');
    await queryInterface.renameColumn('product_group_products', 'product_group_id', 'category_section_id');
    await queryInterface.renameColumn('product_groups', 'catalog_page_id', 'category_id');
    await queryInterface.renameColumn('merchant_pages', 'catalog_page_id', 'category_id');

    await queryInterface.renameTable('product_group_products', 'category_section_products');
    await queryInterface.renameTable('merchant_pages', 'merchant_categories');
    await queryInterface.renameTable('page_products', 'product_categories');
    await queryInterface.renameTable('product_groups', 'category_sections');
    await queryInterface.renameTable('catalog_pages', 'categories');
  }
};
