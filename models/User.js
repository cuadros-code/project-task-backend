const mongoose = require('mongoose')

// Schema colletion [users]
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{ 
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    creationDate:{
        type: Date,
        default: Date.now()
    },
    status:{
        type:Boolean,
        default: true
    }

})

module.exports = mongoose.model('User', userSchema)