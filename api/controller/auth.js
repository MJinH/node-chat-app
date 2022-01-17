const bcrypt = require("bcrypt")
const User = require("../models/User")


const register = async(req,res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.password,salt)

        const newUser = new User( {
            userName: req.body.userName,
            password: newPassword,
            email: req.body.email
        })

        await newUser.save()
        res.status(200).json({newUser})
    } catch(err) {
        res.status(500).json(err)
    }
}


const login = async(req,res) => {
    try {
        const findUser = await User.findOne({userName: req.body.userName})
        !findUser && res.status(404).json("User doest not exist")
        if(findUser.email !== req.body.email) {
            res.status(404).json("Email does not match")
        }
        const checkPassword = await bcrypt.compare(req.body.password,findUser.password)
        !checkPassword && res.status(404).json("Password does not match")

        res.status(200).json(findUser)
    } catch(err) {
        res.status(500).json(err)
    }
}





module.exports = {
    register,
    login
}