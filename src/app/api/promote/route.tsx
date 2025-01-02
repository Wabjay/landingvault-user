import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import validator from 'validator'; 

export async function POST(request: NextRequest) {
  const { email, name, websiteLink } = await request.json();

  if (!email || !validator.isEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }
  if (!name || !websiteLink) {
    return NextResponse.json({ error: 'Name and websiteLink are required' }, { status: 400 });
  }

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    subject: `Promote Product`,
    text: `
    Name: ${name}
    Email: ${email}
    Website Link: ${websiteLink}
    `,
  };
  

  try {
    await transport.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err);
    return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
  }
}
