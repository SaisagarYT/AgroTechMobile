const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    profile:{
        type:String,
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    place:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    pincode:{
        type:Number,
        required:true,
    }
});

module.exports = mongoose.model("User",userSchema);