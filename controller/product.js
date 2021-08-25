const Product = require('../model/product')

const getProductByID = async (req,res)=> {
  try {
    const product = await Product.findById({_id: req.params.id})
    return res.status(200).json({product})
  } catch (error) {
    return res.status(404).json('No Product')
  }
}

module.exports = {
  getProductByID
}