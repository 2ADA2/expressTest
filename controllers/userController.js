import User from "../components/user.js";


class UserController {
    async register(req, res) {
            const user = req.body
            console.log(req.body)
            try{
                if(await User.findOne({ username: user.username })) {
                    return res.status(400).send("User already exists");
                }
                await User.create({name:user.name, password:user.password})
            } catch (e) {
                return res.status(500).send(e)
            }

        }
}

export default new UserController;