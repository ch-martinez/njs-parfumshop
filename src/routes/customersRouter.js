const express = require('express')
const router = express.Router({ mergeParams: true })
const controller = require('../controllers/customersController')
const cAddressRouter = require('./cAddressRouter')

// Todos los clientes
router.get('/all', controller.customersView)

// Editar cliente
router.get('/:cid/edit', controller.customerEditView)
router.post('/:cid/edit', controller.customerEditPost)

// Direcciones del cliente
router.use('/:cid/caddress', cAddressRouter)

// Detalle de cliente
router.get('/:cid', controller.customerDetailView)

module.exports = router