const mongoose = require('mongoose')

// Schema colletion [users]

const  projectSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creationDate:{
        type: Date,
        default: Date.now()
    },

}) 

module.exports = mongoose.model('Project', projectSchema);