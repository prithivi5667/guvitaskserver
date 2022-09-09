const mongoose=require("mongoose")

module.exports=mongoose.connect("mongodb+srv://prithivi:prithivi@cluster0.myqm7.mongodb.net/guvitask?retryWrites=true&w=majority",{
    useUnifiedTopology:true,
    useNewUrlParser :true
},err=>{
    
    if(err)console.log(err)
console.log("db connected")})