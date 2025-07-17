const nodemailer = require("nodemailer");
require("dotenv").config({});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "divyanshurawattest@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

module.exports = {transporter}
