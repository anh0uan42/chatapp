const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Failed to connect:', error)
    }
}

module.exports = connectDB