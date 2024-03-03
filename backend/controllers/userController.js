const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const Recipe=require('../models/recipeModel')
const Comment=require('../models/commentModel')
const errorHandler = require('../utils/error')

module.exports.updateUser = async (req,res,next)=>{
    try{
        const userId = req.params.id; // ID of the user to be deleted
        const loggedInUserId = req.userId; // ID of the logged-in user

        // Check if the user is trying to delete their own account
        if (userId !== loggedInUserId) {
            return next(errorHandler(403, "You are not allowed to update this user")); 
        }


        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt)
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)

    }
    catch(err){
        res.status(500).json(err)
    }
}


module.exports.deleteUser = async (req, res,next) => {

  
    try {
        const userId = req.params.id; // ID of the user to be deleted
        const loggedInUserId = req.userId; // ID of the logged-in user

        // Check if the user is trying to delete their own account
        if (userId !== loggedInUserId) {
            return next(errorHandler(403, "You are not allowed to delete this user")); 
        }

        // Proceed with deleting the user and associated data
        await User.findByIdAndDelete(userId);
        await Recipe.deleteMany({userId: userId});
        await Comment.deleteMany({userId: userId});

        res.status(200).json("User has been deleted!");
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message || "Internal Server Error");
    }
};

module.exports.getUser = async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(user){
            const {password,...info}=user._doc
            res.status(200).json(info)
        }else{
            res.status(500).json("user not found")
        }
       
    }
    catch(err){
        res.status(500).json(err)
    }
}