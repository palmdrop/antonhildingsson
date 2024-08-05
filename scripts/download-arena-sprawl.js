import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import dotenv from "dotenv";
import https from "https";

export const downloadImage = (url, filename) => new Promise((resolve, reject) => {
  const file = createWriteStream(filename);
  https.get(url, response => {
    response.pipe(file)

    file.on("finish", () => {
      file.close();
      console.log(`Image "${filename} downloaded...`)
      resolve()
    })
  }).on("error", error => {
    console.error(`Error downloading image "${filename}": ${error}`);
    fs.unlink(filename, unlinkError => {
      if(!unlinkError) return;
      console.log(`Error deleting image: ${unlinkError}`);
    });

    reject(error);
  });
});

dotenv.config({ path: "./.env.local" });

const CHANNEL_SLUG = "stream-cascade-sprawl";

const BASE_DIRECTORY = "./src/content"
const OUTPUT_DIRECTORY = `${BASE_DIRECTORY}/sprawl/external`;
const ASSETS_SUBDIRECTORY = "assets";
const ASSETS_DIRECTORY = `${BASE_DIRECTORY}/${ASSETS_SUBDIRECTORY}`;

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

  await fs.writeFile(`${OUTPUT_DIRECTORY}/${id}.md`, data);
}

const processTextBlock = async (textBlock, published) => {
  const markdown = `
${textBlock.content}
  `;

  await createSprawlEntry(textBlock, markdown, published);
}

const processImageBlock = async (imageBlock, published) => {
  const title = imageBlock.title ?? "Namnlös";
  const extension = imageBlock.image.filename.split('.').at(-1);
  const imageUrl = imageBlock.image.display.url;
  const imageName = `${imageBlock.id}.${extension}`;
  const imagePath = `${ASSETS_DIRECTORY}/${imageName}`;

  await downloadImage(imageUrl, imagePath);

  const markdown = `
<script lang="ts">
  import img from "$content/${ASSETS_SUBDIRECTORY}/${imageName}?enhanced&w=900;640;400;300";
</script>

<figure>
  <enhanced:img src={img} alt="${title}" sizes="(min-width: 1500px) 900px, (min-width: 900px) 640px, (min-width: 640px) 400px, (min-width: 400px) 300px"/>
  <figcaption>
    ${title}
  </figcaption>
</figure>
`;

  await createSprawlEntry(imageBlock, markdown, published);
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
    (await fs.readdir(OUTPUT_DIRECTORY))
      .map(file => fs.unlink(`${OUTPUT_DIRECTORY}/${file}`))
  );
}

console.log("Downloading Sprawl...");

downloadChannel(CHANNEL_SLUG).then(async pages => {
    const blocks = pages.flatMap(page => page.contents);

    console.log("Processing blocks...");

    await fs.mkdir(OUTPUT_DIRECTORY, { recursive: true });
    await clearDestination();
    await Promise.all(blocks.map(block => processBlock(block, false)));

    console.log("Done processing blocks!");
  })
  .catch(error => console.error(`Error: ${error}`));