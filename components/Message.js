import mongoose from "mongoose";

const Message = mongoose.Schema({
    message: String,
    author: String,
    id: Number
})

export default mongoose.model('Message', Message)