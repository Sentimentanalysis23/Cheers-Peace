import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'src/content');

export interface ContentData {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category?: string;
  contentHtml?: string;
  author?: string;
}

export function getSortedContentData(type: 'blogs' | 'events'): ContentData[] {
  const dirPath = path.join(contentDirectory, type);
  if (!fs.existsSync(dirPath)) return [];

  const fileNames = fs.readdirSync(dirPath);
  const allContentData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(dirPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || 'No Date',
        image: matterResult.data.image || '/images/hero_event.jpg',
        excerpt: matterResult.data.excerpt || '',
        category: matterResult.data.category || 'General',
        author: matterResult.data.author || 'Cheers & Peace',
      };
    });

  // Sort by date
  return allContentData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getContentData(type: 'blogs' | 'events', slug: string): Promise<ContentData> {
  const fullPath = path.join(contentDirectory, type, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: matterResult.data.title || 'Untitled',
    date: matterResult.data.date || 'No Date',
    image: matterResult.data.image || '/images/hero_event.jpg',
    excerpt: matterResult.data.excerpt || '',
    category: matterResult.data.category || 'General',
    author: matterResult.data.author || 'Cheers & Peace',
    contentHtml,
  };
}
