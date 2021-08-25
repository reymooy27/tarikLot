const router = require('express').Router()
const controller = require('../controller/product')

router.get('/product/:id', controller.getProductByID)

module.exports = router