const express = require('express');
const router = express.Router();

router.use('/api/v1/purchase', require('./purchase'))
router.use('/api/v1/auth', require('./auth'));

module.exports = router;