import type { WorkFrontmatter } from "$lib/types/work"; 
export default [
  {
    "path": "src/content/work/featured.md",
    "frontmatter": {
      "title": "Featured",
      "date": "2024-05-31T11:15:21.284Z",
      "tags": [
        "boogie",
        "abc"
      ],
      "links": [],
      "preview": "partial"
    }
  },
  {
    "path": "src/content/work/a-short-poem.md",
    "frontmatter": {
      "title": "A short poem",
      "date": "2024-04-31T11:15:21.284Z",
      "tags": [
        "boogie"
      ],
      "links": [],
      "preview": false
    }
  }
] as { path: string, frontmatter: WorkFrontmatter }[];