import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from './routes/user.routes.js';

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import routers




//router declaration
app.use("/api/v1/users" , userRouter);

export { app }