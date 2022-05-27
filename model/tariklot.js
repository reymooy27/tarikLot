const mongoose = require('mongoose')

const tariklot = new mongoose.Schema({
  name: String
})

module.exports = mongoose.model('TarikLot', tariklot)