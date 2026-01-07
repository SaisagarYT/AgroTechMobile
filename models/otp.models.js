const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your OTP</h1>
            <p>Here is your OTP code: ${otp}</p>`
        );
        console.log("Email sent successful: ", mailResponse);
    }
    catch(err){
        console.log("Error: ",err.message);
    }
}
otpSchema.pre("save", async function (){
    console.log("New document saved to the database");
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp);
    }
})

module.exports = mongoose.model('OtpSchema',otpSchema);