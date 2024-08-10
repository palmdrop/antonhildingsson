<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import { formatDate } from "$lib/utils/date";
	import { getWorkUrl } from "$lib/utils/url";
	import { createDescription } from "$lib/utils/work";
  import HeadMeta from "$lib/components/util/HeadMeta.svelte";

  const { 
    children,
    alone,
    ...frontmatter
  }: WorkFrontmatter & { children: any, alone?: boolean } = $props();
</script>

{ #if alone }
  <HeadMeta
    title={frontmatter.title} 
    description={createDescription(frontmatter)}
    type="article"
  />
{ /if }

<article 
  class={`full-width ${frontmatter.tags?.map(tag => `work-${tag}`).join(' ')}`} 
  class:alone
>
  { #if alone }
    <h1 class="main-grid full-width">
      <span>
        <a 
          href={getWorkUrl(frontmatter.date, frontmatter.fileName)} 
          class="clickable"
        >
          { frontmatter.title }
        </a>
      </span>
      <span>
        { formatDate(frontmatter.date) }
      </span>
    </h1>
  { /if }
  <div class="markdown work-piece">
    {@render children()}
  </div>
</article>

<style>
  .alone {
    border-top: var(--border);
    padding-top: 0.5em;
  }

  .alone .work-piece {
    padding: 0.5em 0em;
  }

  h1 {
    border-bottom: var(--border);
    padding-bottom: var(--gap);
  }

  h1 > * {
    grid-column: span calc(var(--grid-columns) / 2);
  }

  h1 > span:last-child {
    text-align: right;
  }

  :global(.work-piece p) {
    padding-bottom: 0.75em;
    max-width: var(--work-paragraph-width);
  }

  :global(.work-piece hr) {
    position: relative;
    overflow: visible;
    width: 100%;
    max-width: 100%;

    border: none;

    margin: 1em 0em;
    margin-bottom: 2.0em;
  }

  @media screen and (min-width: 2000px) {
    :global(.work-piece hr) {
      max-width: var(--work-paragraph-width);
    }
  }

  :global(.work-piece hr::after) {
    content: "***";
    display: inline-block;
    position: relative;
    top: 0.5em;
    padding: 0 0.25em;
    background-color: var(--bg);
    font-family: var(--font-accent);
  }

  :global(.work-prosa) {
    text-align: justify;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  @media screen and (min-width: 460px) {
    :global(.work-prosa) {
      text-align: left;
      overflow-wrap: normal;
      hyphens: none;
    }
  }
</style>