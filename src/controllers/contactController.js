const nodemailer = require('nodemailer');

function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const user = process.env.SMTP_USER || 'vijin.raj@ibosoninnov.com';
  const pass = process.env.SMTP_PASS || 'srkp orqe ebkv ctxt';
  if (!host || !user || !pass) {
    return null;
  }
  return nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });
}

async function sendInquiry(req, res, next) {
  try {
    const { name, phone, email, productName } = req.body;
    const to = process.env.CONTACT_EMAIL_TO || 'vijin1697@gmail.com';
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    const transporter = createTransporter();
    if (!transporter) {
      return res.status(503).json({
        error:
          'Email delivery is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS on the server.',
      });
    }

    const subject = `[LaptopStore] Inquiry: ${productName}`;
    const text = [
      'New product inquiry from the laptop store website.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || '(not provided)'}`,
      `Product (laptop): ${productName}`,
    ].join('\n');

    const safe = (s) =>
      String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const html = `
      <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#18181b;max-width:520px">
        <h2 style="margin:0 0 12px;font-size:18px">New product inquiry</h2>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          <tr><td style="padding:6px 0;color:#71717a;width:120px">Name</td><td style="padding:6px 0">${safe(name)}</td></tr>
          <tr><td style="padding:6px 0;color:#71717a">Phone</td><td style="padding:6px 0">${safe(phone)}</td></tr>
          <tr><td style="padding:6px 0;color:#71717a">Email</td><td style="padding:6px 0">${email ? safe(email) : '<em>Not provided</em>'}</td></tr>
          <tr><td style="padding:6px 0;color:#71717a;vertical-align:top">Product</td><td style="padding:6px 0;font-weight:600">${safe(productName)}</td></tr>
        </table>
      </div>
    `;

    const mail = {
      from: `"LaptopStore" <${from}>`,
      to,
      subject,
      text,
      html,
    };
    if (email) {
      mail.replyTo = email;
    }

    await transporter.sendMail(mail);

    res.json({ ok: true, message: 'Your message was sent successfully.' });
  } catch (err) {
    next(err);
  }
}

module.exports = { sendInquiry };
