const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const errorHandler = require('../utils/error')

//register 
module.exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body
        if (!firstName || !lastName || !email || !password) {
            return next(errorHandler(401, 'All fields must be filled'))
        }
        if (!validator.isEmail(email)) {
            return next(errorHandler(401, "Email is not valid"))
        }
        if (!validator.isStrongPassword(password)) {
            return next(errorHandler(401, "Password must contain Uppercase lowercase numbers and symbols"))
        }

        const exists = await User.findOne({ email })

        if (exists) {
            return next(errorHandler(401, "Email already exists"))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)
        const newUser = new User({ firstName, lastName, email, password: hashedPassword })
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)

    }
    catch (error) {
        // res.status(500).json({error:error.message})
        next(error)
    }
}

//login
module.exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return next(errorHandler(403, "User not found!"))
        }
        const match = await bcrypt.compare(req.body.password, user.password)

        if (!match) {
            return next(errorHandler(401, "Wrong credentials!"))
        }
        const token = jwt.sign({ _id: user._id, firstName: user.firstName, lastName:user.lastName, email: user.email }, process.env.SECRET, { expiresIn: "3d" })
        const { password, ...info } = user._doc
        res.cookie("token", token).status(200).json(info)

    }
    catch (error) {
        // res.status(500).json({error:error.message})
        next(error)
    }
}


///logout
module.exports.logout = async (req, res, next) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).send("User logged out successfully!")

    }
    catch (error) {
        // res.status(500).json({error:error.message})
        next(error)
    }
}


//refetch
module.exports.refetch = (req, res, next) => {
    const token = req.cookies.token
    jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
        if (err) {
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
}