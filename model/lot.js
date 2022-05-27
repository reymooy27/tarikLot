const mongoose = require('mongoose')

const lot = new mongoose.Schema({
  number: {
    type: Number,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  tarikLotID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TarikLot'
  }
})

module.exports = mongoose.model('Lot', lot)