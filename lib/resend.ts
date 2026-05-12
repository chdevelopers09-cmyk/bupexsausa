import { Resend } from 'resend';
import { WelcomeEmail } from './emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({ 
  email, 
  fullName, 
  memberId,
  graduationYear,
  batch
}: { 
  email: string; 
  fullName: string; 
  memberId: string;
  graduationYear?: string;
  batch?: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'BUPEXSA USA <welcome@bupexsausa.com>',
      to: [email],
      subject: 'Welcome to BUPEXSA USA!',
      react: WelcomeEmail({ fullName, memberId, email, graduationYear, batch }),
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email unexpected error:', error);
    return { success: false, error };
  }
}
