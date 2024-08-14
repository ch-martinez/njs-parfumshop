const express = require('express')
const router = express.Router()
const controller = require('../controllers/providersController')

// Todos los proveedores
router.get('/all', controller.providerView)

// Nuevo proveedore
router.get('/new', controller.providerNewView)
router.post('/new', controller.providerNewPost)

// Editar proveedor
router.get('/:id/edit', controller.providerEditView)
router.post('/:id/edit', controller.providerEditPost)

// Eliminar proveedor
router.post('/:id/delete', controller.providerDeletePost)

// Cambiar el estado del proveedor
router.post('/:id/status/:status', controller.providerStatusPost)

// Detalle de un proveedor
router.get('/:id', controller.providerDetailView)

module.exports = router