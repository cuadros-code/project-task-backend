const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

// SIGN IN
const authUser = async (req, res) => {

    // Validate info on body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { email, password } = req.body

    try {

        // verify is user exists on DB
        const validateUser = await User.findOne({ email })

        if (!validateUser) {
            return res.status(400).json({
                msg: 'User does not exist'
            })
        }

        // compare password from body and password from DB
        const validatePassword = await bcrypt.compare(password, validateUser.password);

        if (!validatePassword) {
            return res.status(400).json({
                msg: 'Incorrect password'
            })
        }

        // user info in token
        const payloadToken = {
            user: {
                id: validateUser.id
            }
        }

        // token signature
        jwt.sign(payloadToken, process.env.SECRET, {
            expiresIn: 3600 // seconds
        }, (err, token) => {

            // if exists error on token
            if (err) throw new Error('error in authentication')
            res.json({ token })

        })

    } catch (error) {
        res.status(500).json({
            msg: 'Has been a error'
        })
    }

}

const getUserAuthenticated = async (req, res) => {

    try {

        const user = await User.findById( req.user.id ).select('-password')

        if(!user){
            return res.status(404).json({
                msg: 'User not found'
            })
        }

        res.json({
            user
        })
        
    } catch (error) {
        console.log(error.response)
        res.status(500).json({
            msg: 'Has been a error'
        })
    }

}

module.exports = {
    authUser,
    getUserAuthenticated
}