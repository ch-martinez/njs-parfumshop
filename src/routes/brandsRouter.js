const express = require('express')
const router = express.Router()
const controller = require('../controllers/brandsController')

// Todas las marcas
router.get('/all', controller.brandsView)

// Nueva marca
router.get('/new', controller.brandNewView)
router.post('/new', controller.brandNewPost)

// Editar una marca
router.get('/:id/edit', controller.brandEditView)
router.post('/:id/edit', controller.brandEditPost)

// Eliminar una marca
router.post('/:id/delete', controller.brandDeletePost)

// Cambio de estado de una marca
router.post('/:id/status/:status', controller.brandStatusPost)

// Detalle de una marca
router.get('/:id', controller.brandDetailView)

module.exports = router