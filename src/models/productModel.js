const db = require('../config/db');

// ── Helpers ──────────────────────────────────────────────────────────────────

function buildFilterQuery(filters) {
  const conditions = ['p.is_active = TRUE'];
  const values = [];
  let idx = 1;

  if (filters.brand) {
    conditions.push(`p.brand = $${idx++}`);
    values.push(filters.brand);
  }
  if (filters.minPrice != null) {
    conditions.push(`p.price >= $${idx++}`);
    values.push(filters.minPrice);
  }
  if (filters.maxPrice != null) {
    conditions.push(`p.price <= $${idx++}`);
    values.push(filters.maxPrice);
  }
  if (filters.minRam != null) {
    conditions.push(`p.ram >= $${idx++}`);
    values.push(filters.minRam);
  }
  if (filters.storageType) {
    conditions.push(`p.storage_type = $${idx++}`);
    values.push(filters.storageType);
  }
  if (filters.os) {
    conditions.push(`p.os ILIKE $${idx++}`);
    values.push(`%${filters.os}%`);
  }
  if (filters.search) {
    conditions.push(
      `(p.name ILIKE $${idx} OR p.brand ILIKE $${idx} OR p.processor ILIKE $${idx})`
    );
    values.push(`%${filters.search}%`);
    idx++;
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  return { where, values };
}

// ── Queries ───────────────────────────────────────────────────────────────────

async function findAll(filters = {}, { page = 1, limit = 12, sort = 'created_at', order = 'desc' } = {}) {
  const { where, values } = buildFilterQuery(filters);

  const allowedSorts = { price: 'p.price', name: 'p.name', created_at: 'p.created_at', ram: 'p.ram' };
  const sortCol = allowedSorts[sort] || 'p.created_at';
  const sortDir = order === 'asc' ? 'ASC' : 'DESC';

  const offset = (page - 1) * limit;

  const countQ = await db.query(
    `SELECT COUNT(*) FROM products p ${where}`,
    values
  );
  const total = parseInt(countQ.rows[0].count, 10);

  const { rows } = await db.query(
    `SELECT * FROM products p ${where}
     ORDER BY ${sortCol} ${sortDir}
     LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    [...values, limit, offset]
  );

  return { products: rows, total, page, limit };
}

async function findById(id) {
  const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  return rows[0] || null;
}

async function findFeatured() {
  const { rows } = await db.query(
    'SELECT * FROM products WHERE is_featured = TRUE AND is_active = TRUE ORDER BY created_at DESC LIMIT 6'
  );
  return rows;
}

async function getDistinctBrands() {
  const { rows } = await db.query(
    "SELECT DISTINCT brand FROM products WHERE is_active = TRUE ORDER BY brand"
  );
  return rows.map((r) => r.brand);
}

async function create(data) {
  const {
    name, brand, model, price, original_price, stock, image_url,
    processor, ram, storage, storage_type, display, gpu, battery, weight, os,
    is_featured = false, is_active = true,
  } = data;

  const { rows } = await db.query(
    `INSERT INTO products
      (name, brand, model, price, original_price, stock, image_url,
       processor, ram, storage, storage_type, display, gpu, battery, weight, os,
       is_featured, is_active)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
     RETURNING *`,
    [name, brand, model, price, original_price, stock, image_url,
     processor, ram, storage, storage_type, display, gpu, battery, weight, os,
     is_featured, is_active]
  );
  return rows[0];
}

async function update(id, data) {
  const fields = Object.keys(data);
  if (!fields.length) return findById(id);

  const sets = fields.map((f, i) => `${f} = $${i + 2}`).join(', ');
  const values = fields.map((f) => data[f]);

  const { rows } = await db.query(
    `UPDATE products SET ${sets} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0] || null;
}

async function remove(id) {
  const { rowCount } = await db.query('DELETE FROM products WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { findAll, findById, findFeatured, getDistinctBrands, create, update, remove };
