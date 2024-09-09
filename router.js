import {Router} from "express";
import UserController from "./controllers/userController.js";

const router = new Router()

router.post("/ping", async (req, res) => {
    setTimeout(() => res.json("pong"), 100)
})

router.post("/users/register", (req, res) => {
    console.log(req.body)
    return res.status(200).json(res.body)
})


export default router