const User = require('./models/user.models.js');
const config = require('./config/config.js');
const nodemailer = require('nodemailer');
const cron  = require('node-cron');

const sendMailtoAllUsers = async(emailObj)=>{

    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT || 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: emailObj,
        subject: 'Hello from Node.js',
        text: 'Hello world from Node.js',
    }

    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            console.log(err);
        }
        else{
            console.log('Email sent: ' + info.response);
        }
    })
}

const sendMailAllUser = ()=>{
    try{
        cron.schedule('*/2 * * * * *', async function(){
            const users = await User.find();
            if(users && users.length > 0 ){
                var emails = [];
                users.map((key)=>{
                    emails.push(key.email);
                });
                sendMailtoAllUsers(emails)
            }
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    sendMailAllUser
}