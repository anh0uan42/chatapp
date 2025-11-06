const express = require('express')
const userRouter = express.Router()

const getUsersForSidebar = require('../controllers/userController')
const protectRoute = require('../middleware/protectRoute')

userRouter.get('/', protectRoute, getUsersForSidebar)

module.exports = userRouter