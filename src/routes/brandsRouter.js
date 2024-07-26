const express = require('express')
const router = express.Router()
const controller = require('../controllers/brandsController')

/* Todos los productos */
router.get('/all', controller.brandsView)

// Nueva marca
router.get('/new', controller.brandNewView)
router.post('/new', controller.brandNewPost)

/* Detalle de una marca */
router.get('/:id', controller.brandDetailView)

/* Editar una marca */
router.get('/:id/edit', controller.brandEditView)
router.post('/:id/edit', controller.brandEditPost)

/* Cambio de estado de una marca */
router.post('/:id/status/:status', controller.brandStatusPost)

module.exports = router