const nodeMailer = require('nodemailer');

async function mailSender(email,title, body) {
    try{
        // create transporter
        let transporter = nodeMailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });

        // send email to user
        let info = await transporter.sendMail({
            from:'sagar',
            to:email,
            subject:title,
            html:body,
        });

        console.log("email info: ",info);
        return info;
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = mailSender;