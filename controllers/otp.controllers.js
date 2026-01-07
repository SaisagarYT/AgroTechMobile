const otpGenerator = require('otp-generator');
const OTP = require('../models/otp.models');
const User = require('../models/user.models');

async function sendOTP(req,res) {
    const {email} = req.body;
    try{
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:'User is already registered'
            });
        }
    
        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars:false
        });
        let result = await OTP.findOne({otp:otp});
    
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
            });
            result = await OTP.findOne({otp:otp});
        }
    
        const otpPayload = {email,otp};
        const otpBody = await OTP.create(otpPayload);
        res.status(200).json({
            success:true,
            message:'OTP sent successfully',
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        });
    }
}

async function verifyOTP(req,res) {
    const {otp,email} = req.body;
    if(!otp){
        return res.status(404).json({
            success:false,
            error:"OTP was not found"
        });
    }
    try{
        const newOTP = await OTP.findOne({email}).sort({createdAt:-1});
        if(!newOTP){
            return res.status(404).json({
                success:false,
                error:"No otp was found with this email!"
            });
        }
        console.log("otp: ",otp,"db_otp: ",newOTP.otp)
        if(otp != newOTP.otp){
            return res.status(400).json({
                success:false,
                error:"otp is invalid!"
            });
        }
        return res.status(200).json({
            success:true,
            error:"otp is successfully verified!"
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        });
    }
}

module.exports = {sendOTP,verifyOTP};
