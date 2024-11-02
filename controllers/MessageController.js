import Message from "../components/Message.js";

class MessageController {
    async send(req) {
        const messages = await Message.find();
        const newMessage= new Message({
            message: req.message,
            author: req.author,
            id:messages.length
        })
        newMessage.save()
        return messages.length
    }
}

export default new MessageController();