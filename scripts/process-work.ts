import fs from "fs/promises";
import { WorkFrontmatter } from '../src/lib/types/work';

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
  console.log("Processing work...")
  const years = await fs.readdir(WORK_DIRECTORY);

  const getYear = async (year: string) => {
    const fileNames = await fs.readdir(`${WORK_DIRECTORY}/${year}`);
    // return workItems.map(fileName => processWorkItem(year, fileName))
    return { year, fileNames };
  }

  const yearAndFileNames = await Promise.allSettled(years.map(getYear));

  const fulfilledYears = yearAndFileNames
    .filter(result => result.status === 'fulfilled') as PromiseFulfilledResult<{ year: string, fileNames: string[] }>[];

  if(fulfilledYears.length !== years.length) {
    console.error(`Error processing year(s): ${years.filter(year => !fulfilledYears.find(result => result.value.year === year)).join(', ')}`);
  }

  const workItemResults = await Promise.allSettled(
    fulfilledYears
      .map(result => result.value)
      .flatMap(({ year, fileNames }) => fileNames.map(fileName => processWorkItem(year, fileName)))
  );

  const errors = workItemResults.filter(result => result.status === 'rejected') as PromiseRejectedResult[];
  const successes = workItemResults.filter(result => result.status === 'fulfilled') as unknown as PromiseFulfilledResult<{ path: string, frontmatter: WorkFrontmatter }>[];

  if(errors.length > 0) {
    console.error(`Error processing work item(s): ${errors.map(result => result.reason).join(', ')}`);
  }

  const items = successes
    .map(success => success.value)
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
  console.log("Done processing work!")
}

const main = async () => {
  await processWork()
}

main();