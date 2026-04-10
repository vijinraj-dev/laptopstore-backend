const router = require('express').Router();
const { login, me, logout } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

router.post('/login',  login);
router.post('/logout', authenticate, logout);
router.get('/me',      authenticate, me);

module.exports = router;
