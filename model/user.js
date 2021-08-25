const mongoose = require('mongoose')

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password:{
    type: String
  },
  googleID:{
    type: String
  }
})

module.exports = mongoose.model('User', user)