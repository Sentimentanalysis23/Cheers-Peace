import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendInquiryNotification } from '@/lib/mailer';

// Helper: Get IP address from request headers
function getClientIP(request: Request): string {
  const headers = request.headers as Headers;
  const forwarded = headers.get('x-forwarded-for');
  const realIP = headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP.trim();
  }
  return '';
}

// Helper: Get approximate location from IP using free ipapi.co service
async function getLocationFromIP(ip: string): Promise<string> {
  // Skip for localhost/private IPs
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168') || ip.startsWith('10.')) {
    return 'Local / Development';
  }

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 'User-Agent': 'cheers-and-peace-website/1.0' },
      signal: AbortSignal.timeout(3000), // 3 second timeout
    });

    if (!response.ok) throw new Error('Geolocation API failed');

    const data = await response.json();
    
    const parts = [
      data.city,
      data.region,
      data.country_name,
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(', ') : 'Unknown';
  } catch {
    return 'Unknown';
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, company, message, location: userLocation } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const clientIP = getClientIP(request);
    
    // Only use the user provided location, as IP geolocations are often inaccurate
    const finalLocation = userLocation?.trim() ? userLocation.trim() : 'Not provided';

    const newInquiry = {
      id: Date.now().toString(),
      name,
      email,
      company: company || 'N/A',
      message,
      date: new Date().toISOString(),
      read: false,
      location: finalLocation,
      ip: clientIP || 'N/A',
    };

    // Save to local JSON file — skipped gracefully on Vercel (read-only filesystem)
    try {
      const filePath = path.join(process.cwd(), 'src', 'data', 'inquiries.json');
      let inquiries: typeof newInquiry[] = [];

      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        inquiries = JSON.parse(fileData);
      }

      inquiries.push(newInquiry);
      fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2));
    } catch {
      // Filesystem is read-only (e.g. Vercel serverless) — email notification below handles delivery
      console.warn('ℹ️ Skipping local file write (read-only filesystem)');
    }

    // Send email notification via Resend
    await sendInquiryNotification({
      name,
      email,
      company: company || 'N/A',
      message,
      location: finalLocation,
      date: newInquiry.date,
    });

    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while submitting your inquiry.' },
      { status: 500 }
    );
  }
}
