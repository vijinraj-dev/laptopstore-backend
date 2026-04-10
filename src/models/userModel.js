const db = require('../config/db');

async function findByEmail(email) {
  const { rows } = await db.query(
    'SELECT * FROM users WHERE email = $1 LIMIT 1',
    [email]
  );
  return rows[0] || null;
}

async function findById(id) {
  const { rows } = await db.query(
    'SELECT id, name, email, role, created_at FROM users WHERE id = $1 LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

module.exports = { findByEmail, findById };
