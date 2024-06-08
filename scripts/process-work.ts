import fs from 'fs/promises';

const WORK_DIRECTORY = "src/content/work";

const WORK_LIST_OUTPUT = "src/content/work-list.ts";

const processWork = async (fileName: string) => {
  const path = `${WORK_DIRECTORY}/${fileName}`;

  const data = await fs.readFile(path, 'utf8');
  const frontmatter = Object.fromEntries(data
    .split('---')
    .filter(Boolean)[0]
    .trim()
    .split('\n')
    .map(line => {
      const separatorIndex = line.indexOf(':');
      const key = line.slice(0, separatorIndex).trim();
      const value = JSON.parse(line.slice(separatorIndex + 1).trim());

      return [key, value]
    })
  );

  frontmatter.fileName = fileName.slice(
    0, fileName.lastIndexOf(".")
  );

  return {
    path,
    frontmatter
  }
}

const main = async () => {
  const fileNames = await fs.readdir(WORK_DIRECTORY);

  const items = (
    await Promise.all(fileNames.map(processWork))
  ).sort(
    (workItem1, workItem2) => workItem2
      .frontmatter
      .date
      .localeCompare(workItem1.frontmatter.date)
  );

  await fs.writeFile(
    WORK_LIST_OUTPUT, 
    `import type { WorkFrontmatter } from "$lib/types/work"; \nexport default ${JSON.stringify(items, null, 2)} as { path: string, frontmatter: WorkFrontmatter }[];`
  );
}

main();