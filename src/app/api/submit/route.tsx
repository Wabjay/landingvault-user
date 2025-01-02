import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { url, name, about } = await request.json();

 
  if (!name || !about || !url) {
    return NextResponse.json({ error: 'Website name, url and details are required' }, { status: 400 });
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
    subject: `Submit Website`,
    text: `
    Website name: ${name}
    Website Url: ${url}
    About Website: ${about}
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
