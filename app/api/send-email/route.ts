import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, subject, message, link } = req.body;

  // Настройте транспорт для отправки электронной почты
  const transporter = nodemailer.createTransport({
    service: 'gmail', // используйте службу, например, Gmail
    auth: {
      user: maximiliangrincevich@gmail.com, // ваш email
      pass: maksimka42231488IQ, // ваш пароль
    },
  });

  // Определите опции для отправки сообщения
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: `${message}\n\n${link}`, // текст сообщения и ссылка
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
}
