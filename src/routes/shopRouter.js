const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.shopView)
router.get('/product/:sku', shopController.productView)

module.exports = router