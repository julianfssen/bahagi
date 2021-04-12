
exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id');
    table.string('name', 255);
    table.bigInteger('amount');
    table.integer('receipt_id').unsigned();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('items');
};
