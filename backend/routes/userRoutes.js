const express=require('express')
const router=express.Router()
const verifyToken = require('../utils/verifyToken')

const {updateUser, deleteUser, getUser} = require('../controllers/userController')


//UPDATE
router.put("/:id",verifyToken, updateUser)


//DELETE
router.delete("/:id",verifyToken, deleteUser)


//GET USER
router.get("/:id",getUser)


module.exports=router