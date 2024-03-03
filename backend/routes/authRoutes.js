const express=require('express')
const router=express.Router()
const {register, login, refetch, logout} = require('../controllers/authController')


//REGISTER
router.post("/register", register)

//LOGIN
router.post("/login",login)

//LOGOUT
router.get("/logout",logout)

//REFETCH USER
router.get("/refetch", refetch)



module.exports=router