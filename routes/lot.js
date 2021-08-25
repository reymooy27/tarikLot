const router = require('express').Router()
const controller = require('../controller/lot')

router.get('/lot/:id', controller.getLotByID)

module.exports = router