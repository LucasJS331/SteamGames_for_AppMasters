module.exports = {
  development: {
    client: 'mysql2',
    connection: process.env.CLEARDB_DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: process.env.TABLE_MIGRATION
    }
  },

 
};