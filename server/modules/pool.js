const pg = require('pg');
const { URL } = require('url');

let config = {};

// Amazon RDS gives a url, not a connection object
if (process.env.DATABASE_URL) {
  const params = new URL(process.env.DATABASE_URL);

  config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: params.hostname,
    port: params.port,
    database: 'rsvp_app',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else {
  config = {
    host: 'localhost', // Server hosting the postgres database
    port: 5432, 
    database: 'rsvp_app',
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
