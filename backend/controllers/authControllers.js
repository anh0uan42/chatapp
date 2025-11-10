const bcrypt = require('bcryptjs')
const User = require('../model/User')
const generateTokenAndSetCookie = require('../utils/generateToken')



const signUp = async (req, res) => {
    const { fullName, username, password, confirmPassword, gender, } = req.body
    if (password !== confirmPassword) return res.status(400).json({ error: 'Password do not match'})
    const user = await User.findOne({ username })

    if (user) return res.status(400).json({ error: "Username is already exist"})

    const hashedPassword = bcrypt.hashSync(password, 10)

    const boyPic = 'https://static.vecteezy.com/system/resources/previews/043/361/860/non_2x/hand-drawnman-avatar-profile-icon-for-social-networks-forums-and-dating-sites-user-avatar-profile-placeholder-anonymous-user-male-no-photo-web-template-default-user-picture-profile-male-symbol-free-vector.jpg'
    const girlPic = 'https://static.vecteezy.com/system/resources/thumbnails/042/332/098/small/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg'

    try {
        const newUser = await User.create({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyPic : girlPic
        })

        if(newUser) {
            
                    generateTokenAndSetCookie(newUser._id, res)
                    await newUser.save()
            
                   res.status(201).json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    profilePic: newUser.profilePic
                   })
        } else {
            res.status(400).json({ error: "Invalid data"})
        }
    } catch (error) {
        console.log(`Could not create user`)
        res.status(500).json({error: 'Internal Error'})
    }
}

const logIn = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
    
        const correctPassword = await bcrypt.compare(password, user?.password || '')
    
        if (!correctPassword || !user) return res.status(400).json({ error: 'Username or password is incorrect' })
    
        generateTokenAndSetCookie(user._id, res)
    
        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log('Login err', error)
        res.status(500).json({ error: 'Internal Error'})
    }
}

const logout = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 0})
        res.status(200).json({ message: 'You have logged out' })
    } catch (error) {
        console.log(`Logout error`, error)
        res.status(500).json({ error: 'Internal Error'})
    }
}

module.exports = { 
    signUp,
    logIn,
    logout
}