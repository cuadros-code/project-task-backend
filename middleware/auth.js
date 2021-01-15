const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {

    // token from header on req
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Token not found'
        })
    }

    try {

        // verify signature token
        const checkToken = jwt.verify( token, process.env.SECRET )

        // get info the payload on token
        req.user = checkToken.user

        // this is for ejecute next middleware
        next()
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: error
        })
    }
    
}

module.exports = auth


