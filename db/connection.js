const knex = require("knex");
const knexFile = require("./knexfile");
const database = knex(knexFile.development);

module.exports = database;