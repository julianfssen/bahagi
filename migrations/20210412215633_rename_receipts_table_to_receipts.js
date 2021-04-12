
exports.up = function(knex) { 
  return knex.schema.renameTable('roles', 'receipts');
};

exports.down = function(knex) {
  return knex.schema.renameTable('receipts', 'roles');
};
