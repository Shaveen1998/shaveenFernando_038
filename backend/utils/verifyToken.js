const jwt=require('jsonwebtoken')
const  errorHandler  = require('./error') ;

const verifyToken=(req,res,next)=>{
    const token=req.cookies.token
  
    if(!token){
       
        return next(errorHandler(401, "Unauthorized"))
    }
    jwt.verify(token,process.env.SECRET, (err,data)=>{
        if(err){
          
            return next(errorHandler(401, "Unauthorized"))
        }
        req.user = data;
        req.userId=data._id
       
        
        
        next()
    })
}

module.exports=verifyToken