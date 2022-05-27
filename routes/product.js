const router = require('express').Router()
const controller = require('../controller/product')
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyUser')

router.get('/products', controller.getALlProduct)
router.get('/product/:id', controller.getProductByID)

// protected route
router.post('/product/:tarikLotID/add', controller.addProduct)
router.delete('/product/:id/delete', controller.deleteProduct)
router.put('/product/:id/update', controller.updateProduct)

module.exports = router