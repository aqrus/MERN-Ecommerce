const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    
    const message = {
        from: `${process.env.SMTP_FROM_NAME} < ${process.env.SMTP_FROM_EMAIL} >`,
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    await transport.sendMail(message);
}

module.exports = sendEmail