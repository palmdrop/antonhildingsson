import fs from 'fs/promises';
import { existsSync } from 'fs';
import { execSync } from 'child_process';

const TMP_FOLDER="./.tmp"
const DEST_FOLDER="./src/content/work";
const FRONTMATTER_PROPERTIES = ["title", "date", "tags", "links", "preview", "published"]
const WRITING_NOTES = /writing\.(prose|poetry)\.([0-9]+)\.([a-z-_]+)\.md/;
const CLONE_COMMAND = `
  cd ${TMP_FOLDER} && \
  ssh-agent bash -c 'ssh-add ~/.ssh/palmdrop_rsa; git -C mindspace pull || git clone git@palmdrop.github.com:palmdrop/mindspace.git mindspace'
`;

(async () => {
  if(!existsSync(TMP_FOLDER)) {
    await fs.mkdir(TMP_FOLDER);
  }
  
  execSync(CLONE_COMMAND);

  const files = await fs.readdir(`${TMP_FOLDER}/mindspace/vault`);
  
  for (const file of files) {
    const match = WRITING_NOTES.exec(file);
    if(!match) continue;

    const [, category, year, fileName] = match;

    const rawData = await fs.readFile(`${TMP_FOLDER}/mindspace/vault/${file}`, 'utf8');

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

    if(!frontmatter.published) continue;

    if(!FRONTMATTER_PROPERTIES.every(property => property in frontmatter)) {
      console.error(`Missing properties in ${file}: ${FRONTMATTER_PROPERTIES.filter(property => !(property in frontmatter))}`);
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

    await fs.unlink(destination);
    await fs.writeFile(destination, data);
  }
})();