//  PATH = /api/auth
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { authUser, getUserAuthenticated } = require('../controllers/authController')
const auth = require('../middleware/auth')

router.post('/', authUser)

router.get('/',
    auth,
    getUserAuthenticated
)

module.exports = router