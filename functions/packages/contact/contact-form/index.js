const nodemailer = require('nodemailer');

async function sendMail(name, email, message) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  return await transporter.sendMail({
    from: process.env.SMTP_USERNAME,
    to: 'dev@marchewczyk.eu',
    subject: `New message: ${email}`,
    text: message,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: <br> ${message}</p>`,
  });
}

function main(args) {
  const name = args.name || '';
  const email = args.email || '';
  let message = args.message || '';
  if (!name || !email || !message) {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' }),
    };
  }
  message = message.replaceAll('\n', '<br>');
  return sendMail(name, email, message).then((res) => {
    console.log('nodemailer success', res);
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: JSON.stringify({ success: 'Message sent' }),
    };
  });
}

module.exports.main = main;
