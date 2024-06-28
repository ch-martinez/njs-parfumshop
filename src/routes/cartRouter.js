const express = require('express')
const {cartView} = require('../controllers/cartController')

const router = express.Router()
router.get('/', cartView)

module.exports = router