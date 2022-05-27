const Tariklot = require('../model/tariklot')

const getALlTarikLot = async (req,res)=>{
  try {
    const allTariklot = await Tariklot.find().lean()
    return res.status(200).json(allTariklot)
  } catch (error) {
    return res.status(404).json({message: 'Cannot get tarik lot'})
  }
}

const getTarikLotByID = async (req,res)=>{
  try {
    const tariklot = await Tariklot.findById({_id: req.params.id}).lean()
    return res.status(200).json(tariklot)
  } catch (error) {
    return res.status(404).json({message: 'Cannot get tarik lot'})
  }
}

const createTarikLot = async (req,res)=>{
  try {
    if(req.body.name === '' || req.body.name === 'undefined'){
      return res.status(400).json({message: 'Name cannot be empty'})
    }

    const tariklLotExist = await Tariklot.findOne({name: req.body.name})
    if(tariklLotExist) return res.status(400).json({message: 'Tarik lot already existed'})

    const newTariklot = new Tariklot({
      name: req.body.name
    })
    await newTariklot.save()
    return res.status(200).json({message: 'Tarik Lot created'})
  } catch (error) {
    return res.status(404).json({message: 'Cannot create tarik lot'})
  }
}



module.exports = {
  getALlTarikLot,
  getTarikLotByID,
  createTarikLot
}