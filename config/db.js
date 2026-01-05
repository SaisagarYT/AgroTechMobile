const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_STRING);
        console.log("Connected successfully");
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = connectDB;


