const express=require("express")
require('dotenv').config()
const app=express()
const cors=require("cors")
app.use(cors())
app.use(express.json())
require('./db/config')
const userRouter=require("./routes/Auth")
app.use('/api',userRouter)
const PORT=5000 ||process.env.PORT
app.listen(PORT,()=>{
    console.log("server started")
})