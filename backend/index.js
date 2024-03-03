const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const recipeRoutes = require('./routes/recipeRoutes')
const commentRoutes = require('./routes/commentRoutes')
const userRoutes  = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const path=require("path")
const cors = require('cors')
const app = express()
const multer = require('multer')

dotenv.config()

//middle ware
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use("/images",express.static(path.join(__dirname,"/images")))

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected")
    }catch(err){
        console.log(err)
    }
    
}

//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})


app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/recipes', recipeRoutes)
app.use('/api/comments', commentRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });


app.listen(process.env.PORT, ()=>{
    connectDB()
    console.log(`Server running on port ${process.env.PORT}`)
})