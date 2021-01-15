const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()


const port = process.env.PORT || 3001

connectDB()

app.use(cors())

// process Application/json
app.use(express.json()) 


app.use('/api/users', require('./routes/users'))

app.use('/api/auth', require('./routes/auth'))

app.use('/api/project', require('./routes/projects'))

app.use('/api/task', require('./routes/task'))

app.listen(port, () => {
    console.log('server on port ', port)
})