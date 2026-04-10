const router = require('express').Router();
const ctrl = require('../controllers/productController');
const { authenticate, requireAdmin } = require('../middleware/auth');

// Public
router.get('/',          ctrl.list);
router.get('/brands',    ctrl.brands);
router.get('/:id',       ctrl.getOne);

// Admin only
router.post('/',         authenticate, requireAdmin, ctrl.create);
router.put('/:id',       authenticate, requireAdmin, ctrl.update);
router.delete('/:id',    authenticate, requireAdmin, ctrl.remove);

module.exports = router;
