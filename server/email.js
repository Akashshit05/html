import nodemailer from 'nodemailer';

function requiredEmailConfig() {
  return [
    'ADMIN_EMAIL',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_FROM'
  ].every((key) => Boolean(process.env[key]));
}

export async function sendAdminNotification(query) {
  if (!requiredEmailConfig()) {
    throw new Error('SMTP email configuration is incomplete.');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const submittedAt = new Date(query.created_at).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL,
    replyTo: query.email,
    subject: `New TL Ke Bolo query: ${query.subject}`,
    text: [
      'A new query was submitted on TL Ke Bolo.',
      '',
      `Name: ${query.name}`,
      `Email: ${query.email}`,
      `Subject: ${query.subject}`,
      `Submitted: ${submittedAt}`,
      '',
      'Message:',
      query.message
    ].join('\n'),
    html: `
      <h2>New TL Ke Bolo query</h2>
      <p><strong>Name:</strong> ${escapeHtml(query.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(query.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(query.subject)}</p>
      <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(query.message).replace(/\n/g, '<br>')}</p>
    `
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
