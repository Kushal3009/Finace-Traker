import nodemailer from 'nodemailer';
import { otpEmailTemplate } from '../template/emailTemp.js';

export async function sendEmail(to, subject, otp) {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });


    // Get the HTML content from the reset password template
    const htmlContent = otpEmailTemplate(otp);

    // Setup email data with HTML content
    let mailOptions = {
        from: process.env.EMAIL, // Sender address
        to: to,                  // List of receivers
        subject: subject,        // Subject line
        html: htmlContent        // HTML body
    };

    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
}
