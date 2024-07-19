import { tags } from "$content/tags"

export type Tag = typeof tags[number]

export type WorkFrontmatter = {
  date: string,
  title: string,
  tags?: Tag[],
  links?: string[],
  preview?: boolean | 'full' | 'partial' | 'none',
  fileName: string,
  published: boolean,
  description?: string
}

export type WorkItem = {
  path: string,
  frontmatter: WorkFrontmatter
}