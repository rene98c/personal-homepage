// src/app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Get password from environment variable or use a fallback for development
    const emailPassword = process.env.EMAIL_PASSWORD;
   
    
    if (!emailPassword) {
      console.warn('EMAIL_PASSWORD environment variable is not set. Email functionality will not work.');
      return NextResponse.json(
        { error: 'Email configuration error. Please contact the administrator.' },
        { status: 500 }
      );
    }
    
    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: 'mail.bdec.ee',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'homepage@bdec.ee',
        pass: emailPassword,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact Form" <homepage@bdec.ee>`,
      to: 'rene@bdec.ee', // Your receiving email
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New message from your portfolio contact form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h4>Message:</h4>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}