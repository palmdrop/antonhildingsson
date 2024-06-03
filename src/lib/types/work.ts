export type WorkFrontmatter = {
  date: string,
  title: string,
  tags?: string[],
  links?: string[],
  preview?: boolean | 'full' | 'partial' | 'none'
}

export type WorkListItem = WorkFrontmatter & {
  id: string,
  href: string,
}