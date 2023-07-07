const nodemailer = require("nodemailer");

const sendEMail = async (email, subject, text, html) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_HOST,
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    try {
        await transporter.sendMail({
            from: `User_registry <${process.env.SMTP_USER}>`,
            to: email,
            subject,
            text,
            html,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendEMail;