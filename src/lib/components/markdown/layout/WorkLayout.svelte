<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import { formatDate } from "$lib/utils/date";
	import { getWorkUrl } from "$lib/utils/url";
	import { createDescription, createTitle } from "$lib/utils/work";

  const { 
    children,
    alone,
    ...frontmatter
  }: WorkFrontmatter & { children: any, alone?: boolean } = $props();
</script>

<svelte:head>
  {#if alone}
    <title>{ createTitle(frontmatter.title) }</title>
    <meta 
      name="description" 
      content={createDescription(frontmatter)}
    />
  {/if}
</svelte:head>

<article class="full-width" class:alone>
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
    border-top: 1px solid var(--fg);
    padding-top: 0.5em;
  }

  .alone .work-piece {
    padding: 1em 0em;
  }

  h1 {
    border-bottom: 1px solid var(--fg);
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
  }

  :global(.work-piece hr) {
    position: relative;
    overflow: visible;
    width: 100%;
    max-width: var(--paragraph-width);

    border: none;

    margin: 1em 0em;
    margin-bottom: 2.0em;
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
</style>