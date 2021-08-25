const User = require('../model/user')

const getUserByID = async (req,res)=> {
  try {
    const user = await User.findById({_id: req.params.id})
    return res.status(200).json({user})
  } catch (error) {
    return res.status(404).json('No User')
  }
}

module.exports = {
  getUserByID
}