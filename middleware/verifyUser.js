const verify = (req,res,next)=>{
  if (req.isAuthenticated()){
    next()
  }else{
    console.log(req.isAuthenticated())
    res.status(401).json({message: 'User is not authenticated'})
  }
}

module.exports = verify
