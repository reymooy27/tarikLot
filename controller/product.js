const Product = require('../model/product')

const getALlProduct = async (req,res)=> {
  try {
    const allProduct = await Product.find().lean()
    console.log(req);
    return res.status(200).json(allProduct)
  } catch (error) {
    return res.status(400).json({message: 'Cannot get products'})
  }
}

const getProductByID = async (req,res)=> {
  try {
    const product = await Product.findById({_id: req.params.id}).lean()
    return res.status(200).json(product)
  } catch (error) {
    return res.status(404).json('No Product')
  }
}

const addProduct = async (req, res)=> {
  try {
    if(req.body.name === '' || req.body.name === 'undefined') {
      return res.status(400).json({message: 'Name cannot be empty'})
    }

    const productExisted = await Product.findOne({
      $and: [
        {name: req.body.name}, 
        {tariklotID: req.params.tarikLotID}
      ]
    })
    if(productExisted) return res.status(400).json({message: 'Product already added'})

    const newProduct = new Product({
      name: req.body.name,
      tarikLotID: req.params.tarikLotID
    })
    await newProduct.save()
    return res.status(200).json({message: 'Product added'})
  } catch (error) {
    return res.status(400).json({message: 'Cannot add product'})
  }
}

const deleteProduct = async (req,res)=> {
  try {
    const product = await Product.findById({_id: req.params.id})
    product.remove()
    res.status(200).json({message: 'Product deleted'})
  } catch (error) {
    res.status(400).json({message: 'Cannot delete product'})
  }
}

const updateProduct = async (req, res)=> {
  try {
    const product = await Product.findById({_id: req.params.id})
    product.set(req.body)
    await user.save()
    res.status(200).json({message: 'Product updated'})
  } catch (error) {
    res.status(400).json({message: 'Cannot update product'})
  }
}

module.exports = {
  getALlProduct,
  getProductByID,
  addProduct,
  deleteProduct,
  updateProduct

}