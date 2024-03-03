const express=require('express')
const router=express.Router()
const verifyToken = require('../utils/verifyToken')
const {createRecipe, editRecipe, deleteRecipe, getRecipeDetails, getRecipes, getUserRecipes} = require('../controllers/recipeController')

//CREATE
router.post("/create",verifyToken, createRecipe)

//UPDATE
router.put("/:id",verifyToken,editRecipe)


//DELETE
router.delete("/:id",verifyToken, deleteRecipe)


//GET RECIPE DETAILS
router.get("/:id",getRecipeDetails)

//GET RECIPEs
router.get("/",getRecipes)

//GET USER RECIPEs
router.get("/user/:userId",getUserRecipes)



module.exports=router