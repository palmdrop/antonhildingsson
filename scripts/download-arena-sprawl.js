import fs from 'fs/promises';
// import Arena from "are.na";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

/*
const arena = new Arena({
  accessToken: process.env.ARENA_ACCESS_TOKEN
});
*/

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
    console.log(pages)
    return pages;
  } catch (error) {
    console.error(error);
  }
};

console.log("Downloading Sprawl...");

/*
arena
  .channel(slug)
  .get()
  .then(async channel => {
  */
downloadChannel(slug).then(async pages => {
    // const blocks = channel.contents;
    const blocks = pages.flatMap(page => page.contents);

    console.log("Processing blocks...");

    await fs.mkdir("./src/content/sprawl/external", { recursive: true });
    // await Promise.all(blocks.map(block => processBlock(block, channel.published)));
    await Promise.all(blocks.map(block => processBlock(block, false)));

    console.log("Done processing blocks!");
  })
  .catch(error => console.error(`Error: ${error.response.statusText}`));