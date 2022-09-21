exports.up = function (knex) {
    return knex.schema
        .createTable('articles', function (table) {
            table.increments('id');
            table.string('heading', 255).notNullable();
            table.string('content', 10000);
            table.timestamps();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('articles');
};