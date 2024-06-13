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
    <title>
      { createTitle(frontmatter.title) }
    </title>
  {/if}
</svelte:head>

<article class="full-width" class:alone>
  { #if alone }
    <Header { ...frontmatter } />
  { /if }
  <section class="markdown">
    {@render children()}
  </section>
</article>

<style>
  .alone {
    border-top: 1px solid var(--fg);
    padding-top: 0.5em;
  }

  section {
    padding: 1em 0em;
  }

  @media screen and (min-width: 500px) {
    section {
      padding: 1em;
    }
  }
</style>