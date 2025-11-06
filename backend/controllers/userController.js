const User = require('../model/User')




const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id

        const otherUsers = await User.find({ __id: { $ne: loggedInUserId }}).select('-password')

        res.status(200).json(otherUsers)
    } catch (error) {
        console.log(`Error getting other users ${error}`)
        res.status(500).json({ message: 'Internal Server Error'})
    }
}

module.exports = getUsersForSidebar