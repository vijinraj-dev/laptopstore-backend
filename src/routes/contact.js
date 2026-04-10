const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const { sendInquiry } = require('../controllers/contactController');

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many contact requests — try again later' },
});

router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 200 }),
    body('phone').custom((value) => {
      if (value == null || typeof value !== 'string' || !value.trim()) {
        throw new Error('Phone number is required');
      }
      const digits = value.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 15) {
        throw new Error('Enter a valid phone number (10–15 digits)');
      }
      return true;
    }),
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('Invalid email address'),
    body('productName').trim().notEmpty().withMessage('Product name is required').isLength({ max: 500 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const first = errors.array()[0];
      return res.status(400).json({ error: first.msg });
    }
    next();
  },
  sendInquiry
);

module.exports = router;
