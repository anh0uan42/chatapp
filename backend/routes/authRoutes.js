const express = require('express')
const authRouter = express.Router()
const authControllers = require('../controllers/authControllers')

authRouter.post('/signup', authControllers.signUp)
authRouter.post('/login', authControllers.logIn)
authRouter.post('/logout', authControllers.logout)


module.exports = authRouter