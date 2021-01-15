const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');

const createUser = async (req, res) => {

    // validate if exits errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { email, password } = req.body

    try {

        // check in database user
        const validateEmail = await User.findOne({ email })

        // return user is already registered
        if (validateEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'user is already registered'
            })
        }

        const user = new User(req.body)

        // password incryption
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        // save in DB
        await user.save()

        // user info in token
        const payloadToken = {
            user:{
                id: user.id
            }
        }

        // token signature
        jwt.sign(payloadToken, process.env.SECRET, {
            expiresIn: 3600 // time of token available
        }, (err, token) => {
            
            // if exist error on token
            if(err) throw new Error('error in authentication')

            res.json({ token })

        })


    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        })
    }
}


module.exports = {
    createUser
}