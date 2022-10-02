/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('bets', function (table) {
      table.string('id');
      table.string('bet_option', 255).nullable();
      table.string('sport', 255).nullable();
      table.string('status', 255).nullable();
      table.string('name', 255).nullable();
      table.string('event_id').nullable();
      table.integer('odd').nullable();
      table.string('result', 255).nullable();
      table.string('created_at', 255).nullable();
      table.string('updated_at', 255).nullable();
      table.boolean('deleted').nullable();
      table.string('deleted_at', 255).nullable();
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

  return knex.schema.dropTable('bets');
};
