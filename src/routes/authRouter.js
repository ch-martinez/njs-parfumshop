const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/login', authController.loginView)
router.get('/recovery', authController.recoveryView)
router.get('/register', authController.registerView)

module.exports = router