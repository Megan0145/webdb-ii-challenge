exports.up = function(knex) {
  return knex.schema.createTable("sales", table => {
    table.increments();
    table.decimal("price").notNullable();
    table
      .integer("car_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cars")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sales");
};
