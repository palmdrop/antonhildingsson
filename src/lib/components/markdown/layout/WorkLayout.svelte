<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import Header from "$lib/components/work/Header.svelte";
	import { createTitle } from "$lib/utils/title";

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
      content={`"${frontmatter.title}" by ${import.meta.env.VITE_TITLE}.`}
    />
  {/if}
</svelte:head>

<article class="full-width" class:alone>
  { #if alone }
    <Header { ...frontmatter } centerTitle={alone} />
  { /if }
  <section class="markdown work-piece">
    {@render children()}
  </section>
</article>

<style>
  .alone {
    border-top: 1px solid var(--fg);
    padding-top: 0.5em;
  }

  .alone section {
    padding: 1em 0em;
  }

  :global(.work-piece p) {
    padding-bottom: 0.75em;
  }

  :global(.work-piece hr) {
    position: relative;
    overflow: visible;
    width: var(--paragraph-width);
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