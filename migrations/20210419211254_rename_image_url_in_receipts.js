
exports.up = function(knex) {
  return knex.schema.table('receipts', table => {
    table.renameColumn('imageUrl', 'image_url');
  });
};

exports.down = function(knex) {
   return knex.schema.table('receipts', table => {
    table.renameColumn('image_url', 'imageUrl');
  });
};
