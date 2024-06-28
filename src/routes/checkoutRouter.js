const express = require('express')
const router = express.Router()
//const {checkoutView} = require('../controllers/checkoutController')

router.get('/', checkoutView)

module.exports = router