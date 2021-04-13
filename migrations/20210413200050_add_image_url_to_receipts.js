
exports.up = function(knex) {
  return knex.schema.table('receipts', table => {
    table.text('imageUrl');
  });
};

exports.down = function(knex) {
  return knex.schema.table('receipts', table => {
    table.dropColumn('imageUrl');
  });
};
