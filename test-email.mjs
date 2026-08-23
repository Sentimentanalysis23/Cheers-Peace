// Quick test — run with: node test-email.mjs
import { Resend } from 'resend';

const resend = new Resend('re_e3Y66xnG_5zHumSWvUQv62UtoN2LxpTC4');

const result = await resend.emails.send({
  from: 'Cheers & Peace <onboarding@resend.dev>',
  to: ['cheerspeace06@gmail.com'],
  subject: '✅ Email Test — Cheers & Peace Website',
  html: `
    <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 40px; background: #000; color: #fff; border-radius: 12px;">
      <h1 style="color: #C1836A; margin: 0 0 16px;">🎉 It Works!</h1>
      <p style="color: rgba(255,255,255,0.8); line-height: 1.7;">
        Your Cheers & Peace email notification system is working correctly.<br><br>
        From now on, every time a customer submits the contact form on your website, 
        a detailed email will be sent to <strong style="color: #C1836A;">Cheerspeace06@gmail.com</strong>.
      </p>
      <div style="margin-top: 24px; padding: 16px; background: rgba(193,131,106,0.1); border: 1px solid rgba(193,131,106,0.3); border-radius: 8px;">
        <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 12px;">Sent at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
      </div>
    </div>
  `,
});

if (result.error) {
  console.error('❌ Email failed:', result.error);
} else {
  console.log('✅ Test email sent successfully! Check Cheerspeace06@gmail.com inbox.');
  console.log('   Email ID:', result.data?.id);
}
