import express from 'express';
import mongoose from "mongoose";
import User from "./user.js";
import cors from "cors";

const port = 5000;
const app = express();
app.use(cors());
const DB_URL = "mongodb+srv://ada22:ada22@cluster0.honp7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


app.post("/api/users/create", async (req, res) => {
    const user = await User.create({
        email: "ada2",
        password: "ada2",
        login: "ada2",
        id:1,
    })
    res.json(user)
})

app.post("/api/ping", async (req, res) => {
    setTimeout(() => res.json("pong"), 100)
})

async function startApp(){
    try{
        await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        app.listen(port, () => console.log("> Server is running on port " + port));
    } catch (e){
        console.log(e)
    }
}

startApp()