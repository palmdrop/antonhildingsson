import fs from 'fs/promises';
import Arena from "are.na";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const arena = new Arena({
  accessToken: process.env.ARENA_ACCESS_TOKEN
});

const slug = "stream-cascade-sprawl";

const createBlockLink = id => `https://are.na/block/${id}`;

const createSprawlEntry = async (block, markdown, published) => {
  const id = block.id;
  const date = new Date(block.updated_at).toISOString();
  const link = createBlockLink(id);
  const data = `---
date: "${date}"
${(link && published) ? `link: "${link}"` : ''}
---

${markdown}
  `;

  await fs.writeFile(`./src/content/sprawl/external/${id}.md`, data);
}

const processTextBlock = async (textBlock, published) => {
  const markdown = `
${textBlock.content}
  `;

  createSprawlEntry(textBlock, markdown, published);
}

const processImageBlock = async (imageBlock, published) => {
  const title = imageBlock.title ?? imageBlock.id;
  const markdown = `
<figure>

![${title}](${imageBlock.image.display.url} "${title}")

  <figcaption>
    ${imageBlock.title ?? "Namnlös"}
  </figcaption>
</figure>
`;

  createSprawlEntry(imageBlock, markdown, published);
}


const processBlock = async (block, published) => {
  switch(block.class) {
    case "Image": return processImageBlock(block, published);
    case "Text":  return processTextBlock(block, published);
    default:      return undefined;
  }
}

console.log("Downloading Sprawl...");

arena
  .channel(slug)
  .get()
  .then(async channel => {
    const blocks = channel.contents;

    console.log("Processing blocks...");

    await fs.mkdir("./src/content/sprawl/external", { recursive: true });
    await Promise.all(blocks.map(block => processBlock(block, channel.published)));

    console.log("Done processing blocks!");
  });