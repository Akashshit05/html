import nodemailer from 'nodemailer';

// Validate required environment variables
function requiredEmailConfig() {
  return [
    'MAIL_USERNAME',
    'MAIL_PASSWORD',
    'ADMIN_EMAIL'
  ].every((key) => Boolean(process.env[key]));
}

// Create reusable Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD, // Gmail App Password
  },
});

// Verify SMTP connection (call this once when the server starts)
export async function verifyEmailConnection() {
  if (!requiredEmailConfig()) {
    throw new Error('Email configuration is incomplete.');
  }

  try {
    await transporter.verify();
    console.log('Gmail SMTP connection verified successfully.');
  } catch (error) {
    console.error('Gmail SMTP verification failed:', error);
    throw error;
  }
}

// Send admin notification
export async function sendAdminNotification(query) {
  if (!requiredEmailConfig()) {
    throw new Error('Email configuration is incomplete.');
  }

  const submittedAt = new Date(query.created_at || Date.now()).toLocaleString(
    'en-IN',
    {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }
  );

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
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
      query.message,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New TL Ke Bolo Query</h2>

        <table style="width:100%; border-collapse: collapse;">
          <tr>
            <td style="padding:8px; font-weight:bold;">Name</td>
            <td style="padding:8px;">${escapeHtml(query.name)}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Email</td>
            <td style="padding:8px;">${escapeHtml(query.email)}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Subject</td>
            <td style="padding:8px;">${escapeHtml(query.subject)}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Submitted</td>
            <td style="padding:8px;">${escapeHtml(submittedAt)}</td>
          </tr>
        </table>

        <hr style="margin:20px 0;">

        <h3>Message</h3>
        <p style="line-height:1.6;">
          ${escapeHtml(query.message).replace(/\n/g, '<br>')}
        </p>

        <hr style="margin:20px 0;">

        <p style="font-size:12px; color:#666;">
          This email was automatically generated from the TL Ke Bolo contact form.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    throw error;
  }
}

// Escape HTML to prevent injection
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
}