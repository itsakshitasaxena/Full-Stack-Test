const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./user'));
router.use('/products', require('./product'));
router.use('/orders', require('./order'));
router.use('/rfq', require('./rfq'));
router.use('/admin', require('./admin'));

module.exports = router;
