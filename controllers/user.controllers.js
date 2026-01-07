const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function showUserDetails(req,res) {
    try{
        const response = await User.find().select('-password');
        if(response.length == 0){
            return res.status(400).json({message:"No User Exist in the Database"})
        }
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
}

async function saveUserDetails(req, res) {
    const {username,email,phone,password,state,place,address,pincode} = req.body;
    const imageFile = req.file;
    if(!username || !email || !password){
        return res.status(404).json({message:"Insufficient user credentials"});
    }
    if(!imageFile){
        return res.status(404).json({message:"image was not recieved"});
    }
    try{
        const isExist = await User.findOne({email:email});
        if(isExist){
            return res.status(400).json({message:"User account already exist."});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);

        const Users = new User({
            profile:imageFile.path,
            username:username,
            email:email,
            phone:phone,
            password:hashedPassword,
            state:state,
            place:place,
            address:address,
            pincode:pincode
        })
        await Users.save();

        const userResponse = Users.toObject();
        delete userResponse.password;
        
        return res.status(201).json(Users);
    }
    catch(err){
        return res.status(500).json({
            Error:err.message
        })
    }
}

async function updateUserDetails(req,res) {
    const {username,email,phone,password,state,place,address,pincode} = req.body;
    const id = req.params.id;
    try{
        const user = await User.findById(id);
        // chekc if user exists
        if(!user){
            return res.status(404).json({
                message:id+"user not found!"
            });
        }
        // Email unqiueness check 
        if(email && email !== user.email){
            const emailExist  = await User.findOne({email});
            if(emailExist){
                return res.status(409).json({
                    message:"Email already in use"
                });
            }
        }

        if(username) user.username = username;
        if(email) user.email = email;
        if(phone) user.phone = phone;
        if(state) user.state = state;
        if(place) user.place = place;
        if(address) user.address = address;
        if(pincode) user.pincode = pincode;

        if(password){
            user.password = await bcrypt.hash(password,10);
        }

        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            message:"User updated successfully",
            user:userResponse
        });
    }
    catch(err){
        return res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        });
    }
}

async function deleteUserDetails(req,res) {
    const id = req.params.id;
    try{
        const isExist = await User.findById(id);
        if(!isExist){
            return res.status(400).json({message:"User not exist!"});
        }
        await User.findByIdAndDelete(id);
        return res.status(200).json({message:"User removed from the DB"});
    }
    catch(err){
        return res.status(500).json({
            ERROR:{
                message:"Internal Server Error",
                errMessage:err.message
            }
        });
    }
}

async function signinUserDetails(req,res) {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(404).json({message:"Proper credentials are not found!"});
    }
    try{
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({error:'Authentication failed1'});
        }
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch) return res.status(401).json({error: 'Authentication failed2'});
    
        const token = jwt.sign({userId:user._id},process.env.SECRET_KEY,{
            expiresIn:'1d',
        });
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:24*60*60*1000
        });
        return res.status(200).json({message:"Login Successfully"});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}

module.exports = {
    saveUserDetails,
    showUserDetails,
    updateUserDetails,
    deleteUserDetails,
    signinUserDetails
};