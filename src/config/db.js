// const { Pool } = require('pg');
// require('dotenv').config();


// const pool = new Pool({
//   host:     process.env.DB_HOST     || 'localhost',
//   port:     parseInt(process.env.DB_PORT || '5432'),
//   database: process.env.DB_NAME     || 'laptopstore',
//   user:     process.env.DB_USER     || 'postgres',
//   password: process.env.DB_PASSWORD || '0386',
//   max: 20,
//   idleTimeoutMillis: 30_000,
//   connectionTimeoutMillis: 2_000,
// });

// pool.on('error', (err) => {
//   console.error('Unexpected DB pool error', err);
// });

// module.exports = pool;


const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env. DATABASE_URL || 'postgresql://laptopstore:JuDT75go1moLFBhLQCIiT06zbJnFAKlk@dpg-d7d76lv7f7vs739msjkg-a.oregon-postgres.render.com/laptopstore',
  ssl: {
    rejectUnauthorized: false, // 🔥 Render க்கு important
  },
});

pool.on('error', (err) => {
  console.error('Unexpected DB pool error', err);
});

module.exports = pool;

