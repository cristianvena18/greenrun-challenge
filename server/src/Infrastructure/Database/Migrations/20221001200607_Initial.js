/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

  return knex.schema
    .createTable('users', function (table) {
      table.string('id');
      table.string('role', 255).nullable();
      table.string('first_name', 255).nullable();
      table.string('last_name', 255).nullable();
      table.string('phone', 255).nullable();
      table.string('email', 255).nullable();
      table.string('username', 255).nullable();
      table.string('password', 255).nullable();
      table.string('address', 255).nullable();
      table.string('gender', 255).nullable();
      table.string('birth_date', 255).nullable();
      table.integer('country_id', 255).nullable();
      table.string('city', 255).nullable();
      table.string('category', 255).nullable();
      table.integer('document_id', 255).nullable();
      table.string('user_state', 255).nullable();
      table.string('created_at', 255).nullable();
      table.string('updated_at', 255).nullable();
      table.boolean('deleted').nullable()
      table.string('deleted_at', 255).nullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

  knex.schema.dropTable('users');
};
