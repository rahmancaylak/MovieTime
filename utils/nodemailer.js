import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_EMAIL_PASSWORD,
  },
});

export const mailOptions = {
  from: process.env.GOOGLE_EMAIL,
};
