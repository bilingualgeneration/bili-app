const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");
import { onCall } from "firebase-functions/v2/https";
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const transporter = nodemailer.createTransport({
  SES: new AWS.SES({ apiVersion: "2010-12-01" }),
});

export const debug = onCall(async (request) => {
  const filePath = path.join(__dirname, "test.pdf"); // Path to your attachment
  const mailOptions = {
    from: "support@thebiliapp.com", // Verified sender email in AWS SES
    to: "jon@sharemeals.org", // Recipient email
    subject: "Test email with attachment from AWS SES",
    text: "Hello, this is a test email with an attachment.",
    attachments: [
      {
        filename: "test.pdf", // Name the file you want to attach
        path: filePath, // Path to the file on disk
      },
    ],
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
});
