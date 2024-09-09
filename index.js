import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import router from "./router.js";
import {errorHandler} from "./middleware/errorHandler.js";


const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router)
app.use(express.urlencoded({ extended: false }));


app.use(errorHandler)

const DB_URL = "mongodb+srv://ada22:ada22@cluster0.honp7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



async function startApp(){
    try{
        await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        app.listen(port, () => console.log("> Server is running on port " + port));
    } catch (e){
        console.log(e)
    }
}

startApp()