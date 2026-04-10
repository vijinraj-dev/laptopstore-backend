const productModel = require('../models/productModel');

// Public ─────────────────────────────────────────────────────────────────────

async function list(req, res, next) {
  try {
    const { brand, minPrice, maxPrice, minRam, storageType, os, search, page, limit, sort, order } = req.query;
    const filters = {
      brand: brand || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      minRam:   minRam  ? parseInt(minRam)      : undefined,
      storageType: storageType || undefined,
      os: os || undefined,
      search: search || undefined,
    };
    const pagination = {
      page:  page  ? parseInt(page)  : 1,
      limit: limit ? parseInt(limit) : 12,
      sort:  sort  || 'created_at',
      order: order || 'desc',
    };

    const result = await productModel.findAll(filters, pagination);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    next(err);
  }
}

async function brands(req, res, next) {
  try {
    const list = await productModel.getDistinctBrands();
    res.json({ brands: list });
  } catch (err) {
    next(err);
  }
}

// Admin ──────────────────────────────────────────────────────────────────────

async function create(req, res, next) {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const product = await productModel.update(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const deleted = await productModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne, brands, create, update, remove };
