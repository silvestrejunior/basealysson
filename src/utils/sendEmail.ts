import { createTransport } from 'nodemailer';
import { IEmailRequest } from '../interfaces/emailInterface';
import 'dotenv/config';

const sendEmail = async ({ subject, text, to }: IEmailRequest) => {
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: text,
    });
    console.log("Email sent with success");
  } catch (err) {
    console.error(err);
    throw new Error("Error sending email, try again later");
  }
};


export { sendEmail };
