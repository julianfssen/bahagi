
exports.up = function(knex) {
  return knex.schema.createTable('roles', function(table) {
    table.increments('id');
    table.string('name', 255);
    table.bigInteger('total_amount');
    table.integer('payer_id').unsigned();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('roles');
};
