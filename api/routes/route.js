const express = require("express")
const router = express.Router()


const {
    register,
    login
} = require("../controller/auth.js")

const {
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
    addFriends,
    deleteFriends
} = require("../controller/users.js")

const {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getFriendPosts
} = require("../controller/posts.js")


router.route('/auth/register').post(register)
router.route("/auth/login").post(login)
router.route("/allUsers/:id").get(getAllUsers)
router.route("/users/:id").get(getUser).patch(updateUser).delete(deleteUser)
router.route("/addFriends/:id").put(addFriends)
router.route("/deleteFriends/:id").put(deleteFriends)
router.route("/posts").post(createPost)
router.route("/posts/:id").patch(updatePost).delete(deletePost).get(getPost)
router.route("/friendPosts").put(getFriendPosts)


module.exports = router