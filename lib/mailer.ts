export async function sendEmail({ to, subject, html, text }: { to: string; subject: string; html?: string; text?: string }) {
  const sendgridKey = process.env.SENDGRID_API_KEY;
  if (sendgridKey) {
    try {
      const body = {
        personalizations: [{ to: [{ email: to }] }],
        from: { email: process.env.MAIL_FROM || 'no-reply@bupexsausa.org', name: 'BUPEXSA USA' },
        subject,
        content: [
          { type: 'text/plain', value: text || '' },
          { type: 'text/html', value: html || text || '' }
        ]
      };

      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sendgridKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const bodyText = await res.text();
        return { error: `SendGrid error: ${res.status} ${bodyText}` };
      }

      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Send error' };
    }
  }

  // No provider configured — log as a safe fallback for local/dev
  console.info('Email not sent (no provider).', { to, subject, text, html });
  return { success: true, fallback: true };
}
