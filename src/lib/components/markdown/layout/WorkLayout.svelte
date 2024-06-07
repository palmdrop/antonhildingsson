<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import Header from "$lib/components/work/Header.svelte";

  const { 
    children,
    alone,
    ...frontmatter
  }: WorkFrontmatter & { children: any, alone?: boolean } = $props();
</script>

{ #if alone }
  <Header { ...frontmatter } />
{ /if }
<article class="markdown full-width">
  {@render children()}
</article>

<style>
  article {
    padding: 1em 0em;
  }

  @media screen and (min-width: 500px) {
    article {
      padding: 1em;
    }
  }
</style>