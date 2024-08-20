const express = require('express')
const router = express.Router()
const controller = require('../controllers/ordersController')

// Todas las ordenes
router.get('/all', controller.ordersView)

// Nueva orden
router.get('/new', controller.orderNewView)
router.post('/new', controller.orderNewPost)

// Editar una orden
router.get('/:id/edit', controller.orderEditView)
router.post('/:id/edit', controller.orderEditPost)

// Detalle de una orden
router.get('/:id', controller.orderDetailView)

module.exports = router