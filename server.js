const express=require("express")
require('dotenv').config()
const app=express()
const cors=require("cors")
app.use(cors())
app.use(express.json())
require('./db/config')
const userRouter=require("./routes/Auth")
app.use('/api',userRouter)
app.listen(5000,()=>{
    console.log("server started")
})