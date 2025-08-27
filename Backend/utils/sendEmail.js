const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject,
      text: message
    });

    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err.message);
    throw err;
  }
};

module.exports = sendEmail;
 