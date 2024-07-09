import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_EMAIL, // Your email
    pass: process.env.NODEMAILER_PW, // Your email password or app-specific password
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;
    var mailOptions = {
      from: email,
      to: process.env.NODEMAILER_EMAIL,
      subject: `Contact from Portfolio Website ${name}`,
      text: message,
    };
    const emailContent = generateEmailContent({ name, email, message });
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL, // Your personal email to receive notifications
      subject: "New Contact Form Submission",
      html: emailContent,
    });

    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Thank you for contacting Naman Nagelia",
      html: generateConfirmationEmail(name),
    });

    return NextResponse.json(
      { message: "Message received and confirmation sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { message: "Error processing your request" },
      { status: 500 }
    );
  }
}

export const generateEmailContent = (data: {
  name: string;
  email: string;
  message: string;
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { color: #E63E60; }
        .message { background-color: #f4f4f4; padding: 15px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <div class="message">
          <h2>Message:</h2>
          <p>${data.message}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

function generateConfirmationEmail(name: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Naman Nagelia</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
          color: #E63E60;
          text-align: center;
          margin-bottom: 20px;
        }
        p {
          margin-bottom: 15px;
        }
        .signature {
          font-style: italic;
          text-align: right;
          margin-top: 30px;
        }
        .social-links {
          text-align: center;
          margin-top: 20px;
        }
        .social-links a {
          color: #E63E60;
          text-decoration: none;
          margin: 0 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Thank You for Reaching Out!</h1>
        <p>Dear ${name},</p>
        <p>I hope this email finds you well. I wanted to personally thank you for contacting me through my portfolio website. I appreciate your interest and the time you've taken to reach out.</p>
        <p>I have received your message and will review it carefully. You can expect to hear back from me at my earliest convenience, typically within 1-2 business days.</p>
        <p>In the meantime, feel free to explore more of my work on my portfolio or connect with me on social media for the latest updates.</p>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/naman-nagelia/" target="_blank">LinkedIn</a> |
          <a href="https://github.com/namanNagelia" target="_blank">GitHub</a> |
        </div>
        <p class="signature">Best regards,<br>Naman Nagelia</p>
      </div>
    </body>
    </html>
  `;
}
