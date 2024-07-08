const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')

router.get('/', adminController.mainView)

/* Customers */
router.get('/customers', adminController.customersView)

/* Products */
router.get('/products', adminController.productsView)
router.get('/product', adminController.productView)
router.get('/product/new', adminController.productNewView)

/* Brands */
router.get('/brands', adminController.brandsView)
//router.get('/brand', adminController.brandView)
//router.get('/brand/new', adminController.brandNewView)

module.exports = router