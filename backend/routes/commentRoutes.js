const express=require('express')
const router=express.Router()
const verifyToken = require('../utils/verifyToken')
const { createComment, deleteComment , editComment, getComments, getAvgRating} = require('../controllers/commentController')

//CREATE
router.post("/create",verifyToken,createComment)

//UPDATE
router.put("/:id",verifyToken,editComment)


//DELETE
router.delete("/:id",verifyToken,deleteComment)


//GET recipe COMMENTS
router.get("/recipe/:recipeId",getComments)

//GET POST COMMENTS
router.get("/average/recipe/:recipeId",getAvgRating)


module.exports=router