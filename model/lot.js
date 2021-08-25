const mongoose = require('mongoose')

const lot = new mongoose.Schema({
  number: {
    type: Number,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
})

module.exports = mongoose.model('Lot', lot)