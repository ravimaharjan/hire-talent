// // /src/utils/notificationUtils.ts
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// export const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to,
//         subject,
//         text,
//     };

//     await transporter.sendMail(mailOptions);
// };
