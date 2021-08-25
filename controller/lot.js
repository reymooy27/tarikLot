const Lot = require('../model/lot')

const getLotByID = async (req,res)=> {
  try{
    const lot = await Lot.findById({_id: req.params.id})
    return res.status(200).json({lot})
  }catch(err){
    return res.status(404).json('No Lot')
  }
}

module.exports = {
  getLotByID
}