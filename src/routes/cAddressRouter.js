const express = require('express')
const router = express.Router({ mergeParams: true })
const controller = require('../controllers/cAddressController')

// Todos los clientes

router.get('/all', controller.cAddressAllView)
//router.get('/:caid/edit', controller.customerEditView)

// Detalle de cliente
router.get('/:caid', controller.cAddressDetailView)

module.exports = router