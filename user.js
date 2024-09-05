import mongoose from "mongoose";

const User = new mongoose.Schema({
    login:{type:String,required: true},
    email:{type:String,required: true},
    password:{type:String,required: true},
    id:{type:Number,required: true},
})

export default mongoose.model("user", User)