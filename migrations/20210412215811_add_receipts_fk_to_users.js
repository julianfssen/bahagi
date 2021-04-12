
exports.up = function(knex) {
  return knex.schema.table('receipts', table => {
    table.foreign('payer_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.table('receipts', table => {
    table.dropForeign('payer_id');
  });
};
