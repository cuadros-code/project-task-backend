const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = () => {

    mongoose.connect(process.env.DB_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(console.log('MONGO_DB Connect'))
        .catch(err => console.log(err))

}

module.exports = connectDB