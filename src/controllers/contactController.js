const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY  || 're_HQoLLLXX_K152PzpCKYtUS1ZzanQz74eY');

async function sendInquiry(req, res, next) {
  try {
    const { name, phone, email, productName } = req.body;

    const to = process.env.CONTACT_EMAIL_TO || "vijin1697@gmail.com";

    const subject = `[LaptopStore] Inquiry: ${productName}`;

    const safe = (s) =>
      String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

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

    await resend.emails.send({
      from: "onboarding@resend.dev", // testing sender
      to,
      subject,
      html,
      reply_to: email || undefined, // user reply panna use aagum
    });

    res.json({ ok: true, message: "Your message was sent successfully." });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = { sendInquiry };