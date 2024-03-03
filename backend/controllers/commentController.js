const Comment=require('../models/commentModel')

module.exports.createComment = async (req,res)=>{
    try{
        const newComment=new Comment(req.body)
        const savedComment=await newComment.save()
        res.status(200).json(savedComment)
    }
    catch(err){
        res.status(500).json(err)
    }
     
}

module.exports.editComment = async (req,res)=>{
    try{
        const newComment=new Comment(req.body)
        const savedComment=await newComment.save()
        res.status(200).json(savedComment)
    }
    catch(err){
        res.status(500).json(err)
    }
     
}

module.exports.deleteComment = async (req,res)=>{
    try{
        await Comment.findByIdAndDelete(req.params.id)
        
        res.status(200).json("Comment has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports.getComments = async (req,res)=>{
    try{
        const comments=await Comment.find({recipeId:req.params.recipeId})
        res.status(200).json(comments)
    }
    catch(err){
        res.status(500).json(err)
    }
}


module.exports.getAvgRating = async (req,res)=>{
    try{
        const comments=await Comment.find({recipeId:req.params.recipeId})
        var sum = 0;
        var average
 
        // Iterate the elements of the array
        comments.forEach(function (c, idx) {
          sum += c.rating;
        });
     
        // Returning the average of the numbers
        average =Math.floor(sum / comments.length) 
        res.status(200).json({average:average})
    }
    catch(err){
        res.status(500).json(err)
    }
}
