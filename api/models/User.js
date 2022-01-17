const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    userName: {
        type:String,
        required: true,
        unique:true,
        min: 3,
        max: 9
    }, 
    password: {
        type:String,
        required:true,
        min: 5
    }, 
    email: {
        type:String,
        required:true,
        unique:true,
        max: 20
    },
    friends: {
        type:Array,
        default:[]
    }
})

module.exports = mongoose.model("User",UserSchema)