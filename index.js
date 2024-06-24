import express, { json } from 'express';
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { connect } from 'mongoose';
const app=express()
dotenv.config({
    path: "./.env",
  });


app.use(json())
app.use(cookieParser())
app.use(cors(
    {
        origin:['http://localhost:3000'],
        credentials:true
    }
))
//routes import
import userRouter from './routes/user.js'
import productRouter from './routes/product.js';
//routes declaration
import cartRouter from './routes/cart.js'
app.use("/api/v1/users",userRouter)
app.use("/api/v1/products",productRouter)
app.use("/api/v1/cart",cartRouter)



connect(`mongodb+srv://naitiksoni1705:7y4BFMLx477YKWpL@cluster0.bz9zzeh.mongodb.net/`).then(()=>{

    console.log('Connected')
    }).catch((err)=>{
        console.log(err)
        })

const port = 8000
app.listen(port,()=>{

    console.log("Server started")
})