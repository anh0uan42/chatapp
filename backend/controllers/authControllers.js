const bcrypt = require('bcryptjs')
const User = require('../model/User')
const generateTokenAndSetCookie = require('../utils/generateToken')



const signUp = async (req, res) => {
    const { fullname, username, password, confirmPassword, gender, } = req.body
    if (password !== confirmPassword) return res.status(400).json({ message: 'Password do not match'})
    const user = await User.findOne( { username })

    if (user) return res.status(400).json({ message: "Username is already exist"})

    const hashedPassword = bcrypt.hashSync(password, 10)

    const boyPic = 'https://static.vecteezy.com/system/resources/previews/043/361/860/non_2x/hand-drawnman-avatar-profile-icon-for-social-networks-forums-and-dating-sites-user-avatar-profile-placeholder-anonymous-user-male-no-photo-web-template-default-user-picture-profile-male-symbol-free-vector.jpg'
    const girlPic = 'https://static.vecteezy.com/system/resources/thumbnails/042/332/098/small/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg'

    try {
        const newUser = await User.create({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyPic : girlPic
        })

        generateTokenAndSetCookie(newUser._id, res)
        await newUser.save()

       res.status(201).json(newUser) 
    } catch (error) {
        console.log(`Could not create user`)
        res.status(500).json({error: 'Internale Error'})
    }
}

const logIn = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ message: 'User not found '})
    
        const correctPassword = await bcrypt.compare(password, user?.password)
    
        if (!correctPassword || !user) return res.status(400).json({ message: 'Username or password is incorrect' })
    
        generateTokenAndSetCookie(user._id, res)
    
        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log('Login err', error)
        res.status(500).json({ message: 'Internal Error'})
    }
}

const logout = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 0})
        res.status(200).json({ message: 'You have logged out' })
    } catch (error) {
        console.log(`Logout error`, error)
        res.status(500).json({ message: 'Internal Error'})
    }
}

module.exports = { 
    signUp,
    logIn,
    logout
}