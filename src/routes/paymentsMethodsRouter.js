const express = require('express')
const router = express.Router()
const controller = require('../controllers/paymentsMethodsController')

// Todas los metodos de pago
router.get('/all', controller.paymentsMethodsView)

// Nueva metodo de pago
//router.get('/new', controller.paymentMethodNewView)
//router.post('/new', controller.paymentMethodNewPost)

// Editar metodo de pago
//router.get('/:id/edit', controller.paymentMethodEditView)
//router.post('/:id/edit', controller.paymentMethodEditPost)

// Eliminar metodo de pago
//router.post('/:id/delete', controller.paymentMethodDeletePost)

// Cambio de estado de metodo de pago
//router.post('/:id/status/:status', controller.paymentMethodStatusPost)

// Detalle de metodo de pago
router.get('/:id', controller.paymentMethodDetailView)

module.exports = router