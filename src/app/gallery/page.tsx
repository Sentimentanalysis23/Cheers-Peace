import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import GalleryClient from './GalleryClient';

export const metadata = {
  title: 'Gallery | Cheers & Peace',
  description: 'Moments from our recent celebrations, exhibitions, and corporate events.',
};

export default function GalleryPage() {
  const galleryDir = path.join(process.cwd(), 'public/images/gallery');
  const videosDir = path.join(process.cwd(), 'public/videos');
  
  let photos: string[] = [];
  let videos: string[] = [];
  
  try {
    if (fs.existsSync(galleryDir)) {
      photos = fs.readdirSync(galleryDir)
        .filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpeg'));
    }
    if (fs.existsSync(videosDir)) {
      videos = fs.readdirSync(videosDir)
        .filter(f => f.toLowerCase().endsWith('.mp4') || f.toLowerCase().endsWith('.webm'));
    }
  } catch (e) {
    console.error("Error reading gallery directories", e);
  }

  return <GalleryClient photos={photos} videos={videos} />;
}
