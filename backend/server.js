const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./db/connect')
const cors = require('cors')
const corsOptions = require('./config/corsOption')
const { app, server } = require('./socket/socket')

const PORT = process.env.PORT || 3500


app.use(cookieParser())
app.use(express.json())

app.use(cors(corsOptions))


app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/message', require('./routes/messageRoutes'))
app.use('/api/users', require('./routes/userRoutes'))



connectDB().then( () => {
        server.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`)
    })
})