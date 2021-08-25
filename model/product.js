const mongoose = require('mongoose')

const product = new mongoose.Schema({
  name: String,
  lotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lot'
  }
})

module.exports = mongoose.model('Product', product)