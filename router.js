import {Router} from "express";
import UserController from "./controllers/UserController.js";
import {authMiddleware} from "./middleware/authMiddleware.js";
import MessageController from "./controllers/MessageController.js";

const router = new Router()

router.post("/ping", async (req, res) => {
    setTimeout(() => {
        res.json("pong")
    }, 100)
})
router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
router.post("/auth", authMiddleware, UserController.check);


export default router