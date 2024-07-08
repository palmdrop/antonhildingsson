import type { PageLoad } from "./$types";

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
  const work = await import(`$content/work/${params.year}/${params.title}.md`);
  console.log(`${params.year}/${params.title}.md`);
  return {
    year: params.year,
    title: params.title,
    Component: work.default
  }
}