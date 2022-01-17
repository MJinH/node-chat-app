const User = require("../models/User")


const getAllUsers = async(req,res) => {
    try{
        const users = await User.find({})
        const allUsers =  await Promise.all(
            users.filter((user) => {
                return user._id.toString() !== req.params.id
            })
        )
        res.status(200).json(allUsers)
    } catch(err) {
        res.status(500).json(err)
    }
}


const getUser = async(req,res) => {
    try {
        const {id: userID} = req.params
        const user = await User.findOne({_id:userID})
        !user && res.status(404).json("User does not exsist")
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
}


const updateUser = async(req,res) => {
    try{
        const {id:userID} = req.params
        const updatedUser = await User.findByIdAndUpdate(userID,req.body, {
            new:true,
            runValidators: true
        })
        res.status(200).json(updatedUser)
    } catch(err) {
        res.status(500).json(err)
    }
}

const deleteUser = async(req,res) => {
    try {
        const {id:userID} = req.params
        const deletedUser = await User.findByIdAndDelete(userID)
        res.status(200).json(deletedUser)
    } catch(err) {
        res.status(500).json(err)
    }
}


const addFriends = async(req,res) => {
    try {
        const {id:userID} = req.params
        const currentUser = await User.findById(req.body.userID)
        if(!currentUser.friends.includes(userID)) {
            await currentUser.updateOne({$push:{friends:userID}})
            res.status(200).json("Add Friend Succeeded")
        }
    } catch(err){
        res.status(500).json(err)
    }
}

const deleteFriends = async(req,res) => {
    try{
        const {id:userID} = req.params
        const currentUser = await User.findById(req.body.userID)
        if(currentUser.friends.includes(userID)) {
            await currentUser.updateOne({$pull: {friends:userID}})
            res.status(200).json("The use has been removed from friend lists")
        } else {
            res.status(403).json("The user is not in your friend lists")
        }
    } catch(err) {
        res.status(500).json(err)
    }
}


module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    addFriends,
    deleteFriends
}