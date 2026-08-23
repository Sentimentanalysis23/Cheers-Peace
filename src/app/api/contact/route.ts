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
    const { name, email, company, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Get client IP and resolve location
    const clientIP = getClientIP(request);
    const location = await getLocationFromIP(clientIP);

    const newInquiry = {
      id: Date.now().toString(),
      name,
      email,
      company: company || 'N/A',
      message,
      date: new Date().toISOString(),
      read: false,
      location,
      ip: clientIP || 'N/A',
    };

    // Save to local JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'inquiries.json');
    let inquiries: typeof newInquiry[] = [];

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      inquiries = JSON.parse(fileData);
    }

    inquiries.push(newInquiry);
    fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2));

    // Send email notification (non-blocking — won't fail the request if email fails)
    sendInquiryNotification({
      name,
      email,
      company: company || 'N/A',
      message,
      location,
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
