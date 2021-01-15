//  PATH = /api/users
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const { createUser } = require('../controllers/userController')

router.post('/',[
    
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({min: 6})

],createUser )

module.exports = router