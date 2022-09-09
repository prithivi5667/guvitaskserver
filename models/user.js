const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },
    profilepic:{
        type:String,
        
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    dob:{
        type:String
    },
    mobile:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

})
const User=mongoose.model("user",UserSchema)

module.exports=User