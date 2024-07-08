const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.userView);
router.get('/purchases', userController.purchasesUserView);
router.get('/data', userController.dataUserView);
router.get('/address', userController.addressUserView);
router.get('/config', userController.configUserView);


module.exports = router;