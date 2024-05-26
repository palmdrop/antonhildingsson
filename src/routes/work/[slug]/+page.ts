import type { PageLoad } from "./$types";

export const prerender = true;

export function load({ params }: PageLoad) {
  return {
    slug: params.slug
  }
}