exports.up = function(knex) {
    return knex.schema.createTable("favorite", (table)=>{
        table.increments("id"),
        table.string("user_name", 250).notNullable(),
        table.string("game_id",250).notNullable(),
        table.integer("rating",10).notNullable(),
        table.string("type",250).notNullable(),
        table.boolean("is_free").notNullable(),
        table.string("game_name").notNullable(),
        table.string("detailed_description",1000).notNullable(),
        table.timestamps(true, true)
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable("favorite")
};
