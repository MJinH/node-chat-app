const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    userID: {
        type:String,
        required:true
    },
    userName: {
        type:String,
        required:true
    },
    post: {
        type:String,
        required:true,
        max: 300
    },
    date: {
       type:String 
    }
},
    {timestamps:true}
)


module.exports = mongoose.model("Post",PostSchema);