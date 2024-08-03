import fs from 'fs/promises';
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const slug = "stream-cascade-sprawl";
const destination = "./src/content/sprawl/external";

const createBlockLink = id => `https://are.na/block/${id}`;

const createSprawlEntry = async (block, markdown, published) => {
  const id = block.id;
  const date = new Date(block.updated_at).toISOString();
  const link = createBlockLink(id);
  const descriptionEntries = parseDescription(block.description || ""); 
  const data = `---
date: "${date}"
${Object.entries(descriptionEntries).map(([key, value]) => `${key}: ${value}`).join("\n")}
${(link && published) ? `link: "${link}"` : ''}
---
${markdown}
  `;

  await fs.writeFile(`${destination}/${id}.md`, data);
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


const parseDescription = (description) => {
  return Object.fromEntries(
    description
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(line => {
        if(!line.includes(":")) return undefined;

        const separatorIndex = line.indexOf(':');
        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim();

        return [key, value]
      })
      .filter(Boolean)
  );
}

const processBlock = async (block, published) => {
  const description = block.description ?? "";
  if(description.includes("published: false")) return undefined;

  switch(block.class) {
    case "Image": return processImageBlock(block, published);
    case "Text":  return processTextBlock(block, published);
    default:      return undefined;
  }
}

export const downloadChannel = async (
  channel,
  pageSize = 100,
  accessToken = process.env.ARENA_ACCESS_TOKEN
) => {
  console.log(`Done fetching channel "${channel}"`);

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`
  }

  try {
    const thumbResponse = await fetch(
      `https://api.are.na/v2/channels/${channel}/thumb`,
      {
        method: "GET",
        headers
      }
    );

    const thumbJson = await thumbResponse.json();

    const length = thumbJson.length;
    const numberOfPages = Math.ceil(length / pageSize);

    const fetchPage = async pageNumber => {
      console.log(`Fetching page ${pageNumber}...`);

      const response = await fetch(
        `https://api.are.na/v2/channels/${channel}/contents?page=${pageNumber}&per=${pageSize}`,
        {
          method: "GET",
          headers
        }
      );

      return response.json();
    }

    const pages = await Promise.all(
      [...Array(numberOfPages).keys()].map(fetchPage)
    );

    console.log(`Done fetching channel "${channel}"`);
    return pages;
  } catch (error) {
    console.error(error);
  }
};

const clearDestination = async () => {
  await Promise.all(
    (await fs.readdir(destination))
      .map(file => fs.unlink(`${destination}/${file}`))
  );
}

console.log("Downloading Sprawl...");

downloadChannel(slug).then(async pages => {
    const blocks = pages.flatMap(page => page.contents);

    console.log("Processing blocks...");

    await fs.mkdir(destination, { recursive: true });
    await clearDestination();
    await Promise.all(blocks.map(block => processBlock(block, false)));

    console.log("Done processing blocks!");
  })
  .catch(error => console.error(`Error: ${error}`));