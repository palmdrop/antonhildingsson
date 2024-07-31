import fs from 'fs/promises';
import dotenv from "dotenv";
import { WorkFrontmatter } from '../src/lib/types/work';
import { createDescription } from '../src/lib/utils/work';

dotenv.config({ path: "./.env" });

const RSS_OUTPUT = `./static/rss.xml`;
const baseUrl = process.env.VITE_BASE_URL;

const createItem = (work: WorkFrontmatter) => {
  const fileName = work.fileName;
  const title = work.title;
  const date = new Date(work.date);
  const year = date.getFullYear();
  const description = createDescription(work, process.env.VITE_TITLE);
  const link = `${baseUrl}/texter/${year}/${fileName}`;

  return `<item>
<guid>${link}</guid>
<title>${title}</title>
<link>${link}</link>
<description>${description}</description>
<pubDate>${date.toUTCString()}</pubDate>
</item>`;
}

export const createRSS = async (work: WorkFrontmatter[]) => {
  const items = work.map(createItem).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
<title>${process.env.VITE_TITLE}</title>
<link>${baseUrl}</link>
<description>${process.env.VITE_DESCRIPTION}</description>
${items}
</channel>
</rss>`;

  await fs.writeFile(RSS_OUTPUT, rss);
}