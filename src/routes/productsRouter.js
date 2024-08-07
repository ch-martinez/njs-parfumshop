const express = require('express')
const router = express.Router()
const controller = require('../controllers/productsController')

// Todos los productos
router.get('/all', controller.productsView)

// Nuevo producto
router.get('/new', controller.productNewView)
router.post('/new', controller.productNewPost)

// Editar producto
router.get('/:id/edit', controller.productEditView)
router.post('/:id/edit', controller.productEditPost)

// Eliminar producto
router.post('/:id/delete', controller.productDeletePost)

// Cambiar el estado del producto
router.post('/:id/status/:status', controller.productStatusPost)

// Detalle del producto
router.get('/:id', controller.productDetailView)

module.exports = router