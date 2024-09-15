import fs from 'fs/promises';
import { existsSync } from 'fs';
import { execSync } from 'child_process';

const REPOSITORY = "mindspace";
const TMP_FOLDER="./.tmp"
const DEST_FOLDER="./src/content/work";
const FRONTMATTER_PROPERTIES = ["title", "date", "tags", "links", "preview", "published"]
const WRITING_NOTES = /writing\.(prose|poetry)\.([0-9]+)\.([a-z-_]+)\.md/;
const CLONE_COMMAND = `
  cd ${TMP_FOLDER} && \
  ssh-agent bash -c 'ssh-add ~/.ssh/palmdrop_rsa; git -C ${REPOSITORY} pull || git clone git@palmdrop.github.com:palmdrop/${REPOSITORY}.git ${REPOSITORY}'
`;

(async () => {
  if(!existsSync(TMP_FOLDER)) {
    console.log("Creating temp folder...")
    await fs.mkdir(TMP_FOLDER);
  }
  
  console.log("Cloning writing repository...")
  execSync(CLONE_COMMAND);

  console.log("Reading files...")
  const files = await fs.readdir(`${TMP_FOLDER}/${REPOSITORY}/vault`);
  
  console.log("Finding writing notes...")
  for (const file of files) {
    const match = WRITING_NOTES.exec(file);
    if(!match) continue;

    const [, category, year, fileName] = match;

    console.log("Found writing note: " + fileName);

    const rawData = await fs.readFile(`${TMP_FOLDER}/${REPOSITORY}/vault/${file}`, 'utf8');

    const [
      rawFrontmatter,
      text
    ] = rawData.split('---').filter(Boolean);

    const frontmatter = Object.fromEntries(rawFrontmatter
      .trim()
      .split('\n')
      .map(line => {
        const separatorIndex = line.indexOf(':');
        const key = line.slice(0, separatorIndex).trim();
        const rawValue = line.slice(separatorIndex + 1).trim();
        let value;
        try {
          value = JSON.parse(rawValue);
        } catch (_) {
          value = rawValue;
        }

        return [key, value]
      })
    );

    if(!frontmatter.published) {
      console.log("Note not published. Skipping...");
      continue;
    }

    if(!FRONTMATTER_PROPERTIES.every(property => property in frontmatter)) {
      console.error(`Missing properties in ${file}: ${FRONTMATTER_PROPERTIES.filter(property => !(property in frontmatter))}. Skipping...`);
      continue;
    }

    const destination = `${DEST_FOLDER}/${year}/${fileName}.md`;
    const frontmatterEntries = Object
      .entries(frontmatter)
      .filter(([key]) => FRONTMATTER_PROPERTIES.includes(key));

    const isPoem = category === 'poetry';
    const data = `---
${frontmatterEntries.map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join("\n")}
---

${isPoem ? '<pre>\n' : ''}${text.trim()}${isPoem ? '\n</pre>' : ''}
  `;

    if(existsSync(destination)) {
      console.log("Note already exists. Deleting...");
      await fs.unlink(destination);
    }

    console.log(`Writing piece ${fileName} to ${destination}...`);
    await fs.writeFile(destination, data);
  }
})();