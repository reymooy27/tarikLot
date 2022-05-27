const router = require('express').Router()
const controller = require('../controller/tariklot')

router.get('/tariklots', controller.getALlTarikLot)
router.get('/tariklot/:id', controller.getTarikLotByID)
router.post('/tariklot/create', controller.createTarikLot)

module.exports = router