export type WorkFrontmatter = {
  date: string,
  title: string,
  // tags: string[],
  // links: string[],
}

export type WorkListItem = WorkFrontmatter & {
  id: string,
  href: string,
}