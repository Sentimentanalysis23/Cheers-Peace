import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface InquiryEmailData {
  name: string;
  email: string;
  company: string;
  message: string;
  location?: string;
  date: string;
}

export async function sendInquiryNotification(inquiry: InquiryEmailData) {
  const locationText = inquiry.location && inquiry.location !== 'Unknown'
    ? inquiry.location
    : 'Not available';

  try {
    await resend.emails.send({
      from: 'Cheers & Peace Website <onboarding@resend.dev>', // Use resend.dev until you verify your domain
      to: ['cheerspeace06@gmail.com'],
      subject: `🎉 New Inquiry from ${inquiry.name} | Cheers & Peace`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0; padding:0; background-color:#0a0a0a; font-family: 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px; padding: 40px; background: linear-gradient(135deg, #111111, #000000); border-radius: 16px; border: 1px solid rgba(193,131,106,0.3);">
              <div style="width: 60px; height: 60px; margin: 0 auto 16px; background: linear-gradient(135deg, #C1836A, #D4AF37); border-radius: 50%;"></div>
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 300; margin: 0 0 8px; letter-spacing: 2px;">CHEERS & PEACE</h1>
              <p style="color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0;">New Client Inquiry</p>
            </div>

            <!-- Alert Banner -->
            <div style="background: rgba(193,131,106,0.1); border: 1px solid rgba(193,131,106,0.4); border-radius: 12px; padding: 20px 24px; margin-bottom: 32px;">
              <p style="color: #C1836A; font-size: 13px; font-weight: 700; letter-spacing: 1px; margin: 0 0 6px;">🔔 ACTION REQUIRED</p>
              <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin: 0; line-height: 1.6;">A new inquiry has been submitted from your website. Please respond within 24 hours.</p>
            </div>

            <!-- Client Details Card -->
            <div style="background: #111111; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; margin-bottom: 24px;">
              <div style="padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03);">
                <p style="color: rgba(255,255,255,0.4); font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin: 0;">Client Information</p>
              </div>
              <div style="padding: 28px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; width: 110px; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.05);">Name</td>
                    <td style="padding: 10px 0; color: #ffffff; font-size: 15px; font-weight: 600; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.05);">${inquiry.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.05);">Email</td>
                    <td style="padding: 10px 0; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.05);">
                      <a href="mailto:${inquiry.email}" style="color: #C1836A; font-size: 14px; text-decoration: none;">${inquiry.email}</a>
                    </td>
                  </tr>
                  ${inquiry.company && inquiry.company !== 'N/A' ? `
                  <tr>
                    <td style="padding: 10px 0; color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.05);">Company</td>
                    <td style="padding: 10px 0; color: rgba(255,255,255,0.8); font-size: 14px; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.05);">${inquiry.company}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 10px 0; color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.05);">Location</td>
                    <td style="padding: 10px 0; color: rgba(255,255,255,0.8); font-size: 14px; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.05);">📍 ${locationText}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; vertical-align: top;">Received</td>
                    <td style="padding: 10px 0; color: rgba(255,255,255,0.8); font-size: 14px; vertical-align: top;">${new Date(inquiry.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })}</td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- Message Card -->
            <div style="background: #111111; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; margin-bottom: 32px;">
              <div style="padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03);">
                <p style="color: rgba(255,255,255,0.4); font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin: 0;">Their Message</p>
              </div>
              <div style="padding: 28px;">
                <p style="color: rgba(255,255,255,0.85); font-size: 15px; line-height: 1.9; margin: 0; font-style: italic; border-left: 3px solid #C1836A; padding-left: 16px;">"${inquiry.message}"</p>
              </div>
            </div>

            <!-- Reply Button -->
            <div style="text-align: center; margin-bottom: 40px;">
              <a href="mailto:${inquiry.email}?subject=Re: Your inquiry to Cheers %26 Peace" 
                 style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #C1836A, #D4AF37); color: #000000; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; border-radius: 50px;">
                ✉️ Reply to ${inquiry.name}
              </a>
            </div>

            <!-- Footer -->
            <div style="text-align: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px;">
              <p style="color: rgba(255,255,255,0.2); font-size: 11px; letter-spacing: 2px; margin: 0 0 6px;">CHEERS & PEACE EVENT MANAGEMENT</p>
              <p style="color: rgba(255,255,255,0.12); font-size: 10px; margin: 0;">Bangalore, India</p>
            </div>

          </div>
        </body>
        </html>
      `,
    });

    console.log(`✅ Email notification sent for inquiry from ${inquiry.name}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send email notification:', error);
    return { success: false, error };
  }
}
