
exports.up = function(knex) {
  return knex.schema.table('items', table => {
    table.foreign('receipt_id').references('id').inTable('receipts');
  });
};

exports.down = function(knex) {
  return knex.schema.table('items', table => {
    table.dropForeign('receipt_id');
  });
};
