import User from "../components/User.js";
import jwt from "jsonwebtoken";
import Message from "../components/Message.js";
class UserController {

    async register(req, res) {
        const {username, password} = req.body;
        try{
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(400).json({error: "User already exists"});
            }
            await User.create({username, password})
            const token = await jwt.sign({username, password},  "22ada22");
            res.status(200).json({token})
        } catch (e) {
            res.status(500).json({error: e})
        }

    }

    async login(req, res) {
        const {username, password} = req.body;
        try{
            const candidate = await User.findOne({username})
            if(!candidate) {
                return res.status(400).json({error: "User does not exist"});
            }
            const token = await jwt.sign({username, password},  "22ada22");
            res.status(200).json({token})
        } catch (e) {
            res.status(500).json({error: e})
        }
    }

    async check(req, res){
        const candidate = User.findOne(req.user.username)
        const messages = await Message.find()
        if(!candidate){
            res.status(401).json({status:"User does not exist"});
        }
        res.json({username:req.user.username, messages})
    }
}

export default new UserController()