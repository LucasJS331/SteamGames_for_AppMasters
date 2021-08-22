module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_HOST,
      password: process.env.DATABASE_KEY
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: process.env.TABLE_MIGRATION
    }
  },

 
};