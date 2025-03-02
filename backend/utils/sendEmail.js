import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const sendEmail = async ({ email, subject, message }) => {
  try {
    console.log(" Sending email to:", email);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true", // Convert string to boolean
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error(" Email sending failed:", error);
    throw new Error(error.message || "Email could not be sent");
  }
};

export {sendEmail}