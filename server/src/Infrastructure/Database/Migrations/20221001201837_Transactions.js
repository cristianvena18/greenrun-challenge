/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema
    .createTable('transactions', function (table) {
      table.string('id').unique();
      table.string('user_id').nullable();
      table.integer('amount').nullable();
      table.string('category', 255).nullable();
      table.string('status', 255).nullable();
      table.string('user_bet_id').nullable();
      table.string('created_at', 255).nullable();
      table.string('updated_at', 255).nullable();
      table.boolean('deleted').nullable();
      table.string('deleted_at', 255).nullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

  return knex.schema.dropTable('transactions');
};
