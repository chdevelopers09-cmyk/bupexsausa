import nodemailer from 'nodemailer'

export async function createTransport() {
  if (!process.env.EMAIL_SERVER) {
    // Create Ethereal test account when EMAIL_SERVER not configured
    const testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
    return { transporter, testAccount }
  }

  const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER)
  return { transporter }
}

export async function sendVerificationEmail({ to, html, subject, text }: { to: string; html: string; subject?: string; text?: string }) {
  const { transporter, testAccount } = await createTransport() as any
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'noreply@localhost',
    to,
    subject: subject || 'Sign in to your account',
    text: text || undefined,
    html,
  })

  if (testAccount) {
    return { messageId: info.messageId, previewUrl: nodemailer.getTestMessageUrl(info) }
  }

  return { messageId: info.messageId }
}
