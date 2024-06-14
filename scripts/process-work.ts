import fs from "fs/promises";

const BASE_DIRECTORY = "src/content";
const WORK_DIRECTORY = `${BASE_DIRECTORY}/work`;

const WORK_LIST_OUTPUT = `${BASE_DIRECTORY}/work-list.ts`;
const TAGS_OUTPUT = `${BASE_DIRECTORY}/tags.ts`;

const processWorkItem = async (year: string, fileName: string) => {
  const path = `${WORK_DIRECTORY}/${year}/${fileName}`;

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

  if(frontmatter.tags) {
    frontmatter.tags = (frontmatter.tags as string[]).sort();
  }

  if(year !== new Date(frontmatter.date).getFullYear().toString()) {
    throw new Error(
      `Year mismatch in ${fileName}: ${year} != ${new Date(frontmatter.date).getFullYear().toString()}`
    );
  }

  frontmatter.fileName = fileName.slice(
    0, fileName.lastIndexOf(".")
  );

  return {
    path,
    frontmatter
  }
}

const processWork = async () => {
  const years = await fs.readdir(WORK_DIRECTORY);

  const processYear = async (year: string) => {
    const workItems = await fs.readdir(`${WORK_DIRECTORY}/${year}`);
    return Promise.all(
      workItems.map(fileName => processWorkItem(year, fileName))
    );
  }

  const items = (await Promise.all(
    years.map(processYear)
  ))
    .flat()
    .sort(
      (workItem1, workItem2) => workItem2
        .frontmatter
        .date
        .localeCompare(workItem1.frontmatter.date)
    );

  const tags = new Set(
    items.map(item => item.frontmatter.tags).flat()
  );

  await Promise.all([
    fs.writeFile(TAGS_OUTPUT, `export const tags = ${JSON.stringify(Array.from(tags))} as const;`),
    fs.writeFile(
      WORK_LIST_OUTPUT, 
      `import type { WorkFrontmatter } from "$lib/types/work"; \nexport default ${JSON.stringify(items, null, 2)} as { path: string, frontmatter: WorkFrontmatter }[];`
    )
  ]);
}

const main = async () => {
  await processWork()
}

main();