const dotenv = require('dotenv');
dotenv.config();
const { knexSnakeCaseMappers } = require('objection');

// Update with your config settings.
module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DB_CONNECTION,

    ...knexSnakeCaseMappers()
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
