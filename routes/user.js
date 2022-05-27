const router = require('express').Router()
const controller = require('../controller/user')

router.get('/users', controller.getAllUser)
router.get('/user/:id', controller.getUserByID)

module.exports = router