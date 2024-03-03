const mongoose=require('mongoose')

const RecipeSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    steps:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        required:false,
        
    },
    username:{
        type:String,
        required:true,  
    },
    userId:{
        type:String,
        required:true,  
    },
    ingredients:{
        type:Array,
        required:true
    },
    timeToCook:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("Recipe",RecipeSchema)