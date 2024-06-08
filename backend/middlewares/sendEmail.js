const nodemailer = require('nodemailer');
const {users} = require('../models');
const sendReminderMail = async (email,msg,html) => {
    
 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ks8995943@gmail.com',
            pass: 'pcqi ighg yfoh crlg'
        }
    });

    let mailOptions = {
        from: "ks8995943@gmail.com",
        to: email,
        subject:"This is a remider to take medicine",
        text:msg,
        html:html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const sendReportMail = async(email,filepath,)=>{

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ks8995943@gmail.com',
            pass: 'pcqi ighg yfoh crlg'
        }
    });

    let mailOptions = {
        from: "ks8995943@gmail.com",
        to: email,
        subject:"Your weekly report",
        attachments: [{path:filepath}],
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = { sendReminderMail, sendReportMail};
