import type { PageLoad } from "./$types";
import workList from "$content/work-list";
import type { WorkFrontmatter } from "$lib/types/work";
import type { Component } from "svelte/compiler";

export const prerender = true;

export const load: PageLoad = async () => {
  const latestFrontmatter = workList.find(work => work.frontmatter.published)?.frontmatter as WorkFrontmatter;
  const year = new Date(latestFrontmatter.date).getFullYear();
  const work = await import(`$content/work/${year}/${latestFrontmatter.fileName}.md`);
  return {
    featured: {
      Component: work.default as Component,
      frontmatter: latestFrontmatter
    }
  }
}