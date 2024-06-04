export type WorkFrontmatter = {
  date: string,
  title: string,
  tags?: string[],
  links?: string[],
  preview?: boolean | 'full' | 'partial' | 'none'
}