const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "email@gmail.com", //your email address of email you want to use to send emails
        pass: "password" //your password
    }
});


//firebase function to send email
exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        //variables taken from frontend contact form - these can be hardcoded in mailOptions if its an automated email
        let senderName = req.body.contactFormName;
        let senderEmail = req.body.contactFormEmail;
        let messageText = req.body.contactFormMessage;
      
        let mailOptions = {
          to: 'email@gmail.com', // Enter here the email address on which you want to send emails from your customers
          from: senderEmail,
          subject: 'subject line',
          text: messageText,
          replyTo: senderEmail
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});