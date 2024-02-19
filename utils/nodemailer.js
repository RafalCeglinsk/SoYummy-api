import { createTransport } from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const createTransportOptions = {
  service: process.env.NODEMAILER_SERVICE,
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secureConnection: false,
  tls: {
    ciphers: 'SSLv3',
  },
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
}

export const sendEmail = async (email) => {
  const transporter = createTransport(createTransportOptions)
  return await transporter
    .sendMail({
      from: process.env.NODEMAILER_FROM_MAIL,
      to: email,
      subject: 'Subscription',
      html: `Congratulation! You have successfully subscribed of our recipes`,
    })
    .then((info) => {
      console.log(info)
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })
}
