import type { WorkFrontmatter } from "$lib/types/work"; 
export default [
  {
    "path": "src/content/work/2024/featured.md",
    "frontmatter": {
      "title": "Featured",
      "date": "2024-05-31T11:15:21.284Z",
      "tags": [
        "boogie",
        "abc"
      ],
      "links": [],
      "preview": "full",
      "fileName": "featured"
    }
  },
  {
    "path": "src/content/work/2024/really-long-one.md",
    "frontmatter": {
      "title": "Super Really long one",
      "date": "2024-05-31T11:15:21.284Z",
      "tags": [
        "long",
        "123"
      ],
      "links": [],
      "preview": "partial",
      "fileName": "really-long-one"
    }
  },
  {
    "path": "src/content/work/2024/a-short-poem.md",
    "frontmatter": {
      "title": "A short poem",
      "date": "2024-04-31T11:15:21.284Z",
      "tags": [
        "boogie"
      ],
      "links": [],
      "preview": false,
      "fileName": "a-short-poem"
    }
  },
  {
    "path": "src/content/work/2023/an-old-one.md",
    "frontmatter": {
      "title": "An old one",
      "date": "2023-04-31T11:15:21.284Z",
      "tags": [
        "scoop"
      ],
      "links": [],
      "preview": true,
      "fileName": "an-old-one"
    }
  }
] as { path: string, frontmatter: WorkFrontmatter }[];