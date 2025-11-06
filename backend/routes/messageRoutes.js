const express = require('express')
const messageRouter = express.Router()
const messageControllers = require('../controllers/messageController')
const protectRoute = require('../middleware/protectRoute')


messageRouter.post('/send/:id', protectRoute, messageControllers.sendMessage)
messageRouter.get('/:id', protectRoute, messageControllers.recieveMessage)

module.exports = messageRouter