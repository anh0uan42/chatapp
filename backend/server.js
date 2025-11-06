const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./db/connect')

const PORT = process.env.PORT || 3500
const app = express()

app.use(cookieParser())
app.use(express.json())


app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/message', require('./routes/messageRoutes'))
app.use('/api/users', require('./routes/userRoutes'))



connectDB().then( () => {
        app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`)
    })
})