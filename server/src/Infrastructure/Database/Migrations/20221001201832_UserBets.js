/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('user_bets', function (table) {
      table.string('id');
      table.string('user_id').nullable();
      table.string('bet_id').nullable();
      table.integer('odd').nullable();
      table.integer('amount').nullable();
      table.string('state', 255).nullable();
      table.string('created_at', 255).nullable();
      table.string('updated_at', 255).nullable();
      table.boolean('deleted').nullable().defaultTo(false);
      table.string('deleted_at', 255).nullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

  return knex.schema.dropTable('user_bets');
};
