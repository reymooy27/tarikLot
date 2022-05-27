const mongoose = require('mongoose')

const product = new mongoose.Schema({
  name: String,
  lotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lot'
  },
  tarikLotID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TarikLot'
  }
})

module.exports = mongoose.model('Product', product)