const router = require('express').Router()
const userRoute = require('../routes/user')
const lotRoute = require('../routes/lot')
const productRoute = require('../routes/product')

router.use(userRoute)
router.use(lotRoute)
router.use(productRoute)

router.get('/', (req,res)=>{
  return res.status(200).json({message: 'ok'})
})


module.exports = router