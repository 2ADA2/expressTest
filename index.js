import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import router from "./router.js";
import {errorHandler} from "./middleware/errorHandler.js";
import {createServer} from 'http';
import {WebSocketServer} from "ws";
import Message from "./components/Message.js";
import MessageController from "./controllers/MessageController.js";

const port = 3002;
const app = express();
const server = createServer(app);


app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(errorHandler)


const wss = new WebSocketServer({server});


const DB_URL = "mongodb+srv://ada22:ada22@cluster0.honp7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const clients = new Set();
wss.on("connection", (ws) => {
    console.log("client connected");
    clients.add(ws);

    ws.on("message", async (msg) => {
        msg = JSON.parse(msg);
        await MessageController.send(msg)
            .then((res) => {
                clients.forEach(client => {
                    console.log(msg)
                    client.send(JSON.stringify({...msg, id:res}));
                });
            })
    })

    ws.on("close", () => {
        console.log("client disconnected");
        clients.delete(ws);
    });
})

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        server.listen(port, () => console.log("> Server is running on port " + port));
    } catch (e) {
        console.log(e)
    }
}

startApp()