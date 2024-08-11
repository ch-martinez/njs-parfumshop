const express = require('express')
const router = express.Router()
const controller = require('../controllers/couponsController')

// Todos los cupones
router.get('/all', controller.couponsView)

// Nuevo cupon
router.get('/new', controller.couponNewView)
router.post('/new', controller.couponNewPost)

// Editar cupon
router.get('/:id/edit', controller.couponEditView)
router.post('/:id/edit', controller.couponEditPost)

// Eliminar cupon
router.post('/:id/delete', controller.couponDeletePost)

// Cambiar el estado del cupon
router.post('/:id/status/:status', controller.couponStatusPost)

// Detalle del cupon
router.get('/:id', controller.couponDetailView)

module.exports = router