const Post = require("../models/Post")
const User = require("../models/User")

const createPost = async(req,res) => {
    try {
        const post = new Post(req.body)
        const userPost = await post.save()
        res.status(200).json(userPost)
    } catch(err) {
        res.status(500).json(err)
    }
}


const getPost = async(req,res) => {
    try {
        const user = await User.findById(req.params.id)
        const post = await Post.find({userID: user._id})
        res.status(200).json(post)
    } catch(err) {
        res.status(500).json(err)
    }
}

const getFriendPosts = async(req,res) => {
    try {
        const user = await User.find({_id: {$in:req.body.friends}})
        const post = await Promise.all(
            user.map((user) => {
                return Post.find({userID:user._id})
            })
        )
        res.status(200).json(post)
    } catch(err) {
        res.status(500).json(err)
    }
}

const updatePost = async(req,res) => {
    try {
        const {id:userID} = req.params
        const post = await Post.findById(userID)
        !post && res.status(404).json("The user does not exists")
        const updatedPost = await Post.updateOne({$set:req.body})
        res.status(200).json(updatedPost)
    } catch(err) {
        res.status(500).json(err)
    }
}

const deletePost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        !post && res.status(404).json("The user does not exists")
        const deletedPost = await post.deleteOne()
        res.status(200).json(deletedPost)
    } catch(err) {
        res.status(500).json(err)
    }
}


module.exports =  {
    createPost,
    getPost,
    getFriendPosts,
    updatePost,
    deletePost
}