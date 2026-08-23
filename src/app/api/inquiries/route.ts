import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'inquiries.json');

export async function GET() {
  try {
    let inquiries = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      inquiries = JSON.parse(fileData);
    }
    
    // Sort newest first
    inquiries.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json({ inquiries }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, read } = await request.json();
    
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      const inquiries = JSON.parse(fileData);
      
      const inquiryIndex = inquiries.findIndex((i: any) => i.id === id);
      if (inquiryIndex > -1) {
        inquiries[inquiryIndex].read = read;
        fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2));
        return NextResponse.json({ success: true });
      }
    }
    
    return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}
