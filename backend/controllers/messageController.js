const Message = require('../model/Message')
const Conversation = require('../model/Conversation')
const { getReceiverSocketId, io } = require('../socket/socket')

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: recieverId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, recieverId]}
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocketId(recieverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage)
        }
    res.status(201).json(newMessage)
    } catch (error) {
        console.log('Controller error', error.message)
        res.status(500).json({ error: 'Internal server error'})
    }
}

const recieveMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id
        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages")

        if (!conversation) return res.status(200).json([])
        const messages = conversation.messages

        res.status(200).json(messages)
    } catch (error) {
        console.log(`Couldno recieve message ${error}`)
        res.status(500).json({ message: 'Internal Server Error'})
    }
}

module.exports = {
    sendMessage,
    recieveMessage
}