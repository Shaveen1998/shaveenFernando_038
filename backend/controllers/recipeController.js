const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const Recipe=require('../models/recipeModel')
const Comment=require('../models/commentModel')
const errorHandler = require('../utils/error')

module.exports.createRecipe = async (req,res)=>{
    try{
        const newRecipe=new Recipe(req.body)
        // console.log(req.body)
        const savedRecipe=await newRecipe.save()
        
        res.status(200).json(savedRecipe)
    }
    catch(err){
        
        res.status(500).json(err)
    }
     
}
module.exports.editRecipe = async (req,res)=>{
    try{
        const loggedInUserId = req.userId; // ID of the logged-in user
        const recipe = await Recipe.findById(req.params.id)
        if (recipe.userId !== loggedInUserId) {
            return next(errorHandler(403, "You are not allowed to update this recipe")); 
        }
        const updatedRecipe=await Recipe.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedRecipe)

    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports.deleteRecipe = async (req,res,next)=>{
    try{
        const loggedInUserId = req.userId; // ID of the logged-in user
        const recipe = await Recipe.findById(req.params.id)
        if(recipe.userId !== loggedInUserId){
            return next(errorHandler(403, "You are not allowed to delete this recipe")); 
        }
        await recipe.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({recipeId:req.params.id})
        res.status(200).json("Recipe has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports.getRecipeDetails = async (req,res)=>{
    try{
        const recipe=await Recipe.findById(req.params.id)
        res.status(200).json(recipe)
    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports.getRecipes = async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const recipes=await Recipe.find(query.search?searchFilter:null)
        res.status(200).json(recipes)
    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports.getUserRecipes = async (req,res)=>{
    try{
        const userId = req.params.id; // ID of the user to be deleted
        const loggedInUserId = req.userId; // ID of the logged-in user

        // Check if the user is trying to delete their own account
        if (userId !== loggedInUserId) {
            return next(errorHandler(403, "You are not allowed")); 
        }
        const recipes=await Recipe.find({userId:req.params.userId})
        res.status(200).json(recipes)
    }
    catch(err){
        res.status(500).json(err)
    }
}