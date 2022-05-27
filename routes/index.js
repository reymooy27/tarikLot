const router = require('express').Router()
const userRoute = require('../routes/user')
const lotRoute = require('../routes/lot')
const productRoute = require('../routes/product')
const tariklotRoute = require('../routes/tariklot')
const authRoute = require('../routes/auth')

router.use(userRoute)
router.use(lotRoute)
router.use(productRoute)
router.use(tariklotRoute)
router.use(authRoute)

router.get('/', (req,res)=>{
  return res.status(200).json({message: 'ok'})
})


module.exports = router