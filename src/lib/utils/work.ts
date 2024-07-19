import type { WorkFrontmatter } from "$lib/types/work";

export const createTitle = (value?: string) => {
  if(!value) return import.meta.env.VITE_TITLE;
  return `${value} | ${import.meta.env.VITE_TITLE}`;
}

export const createDescription = (frontmatter: WorkFrontmatter, title = import.meta.env.VITE_TITLE) => {
  return frontmatter.description ?? `"${frontmatter.title}" av ${title}.`;
}