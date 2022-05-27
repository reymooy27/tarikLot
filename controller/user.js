const User = require('../model/user')

const getAllUser = async (req,res)=> {
  try {
    const allUser = await User.find().lean()
    return res.status(200).json(allUser)
  } catch (error) {
    return res.status(404).json('No User')
  }
}

const getUserByID = async (req,res)=> {
  try {
    const user = await User.findById({_id: req.params.id}).lean()
    return res.status(200).json(user)
  } catch (error) {
    return res.status(404).json('No User')
  }
}

module.exports = {
  getAllUser,
  getUserByID
}