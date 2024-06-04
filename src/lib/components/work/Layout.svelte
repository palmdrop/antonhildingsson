<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import Header from "./Header.svelte";

  const { 
    children,
    alone,
    ...frontmatter
  }: WorkFrontmatter & { children: any, alone?: boolean } = $props();
</script>

{ #if alone }
  <Header { ...frontmatter } />
{ /if }
<article>
  {@render children()}
</article>

<style>
  article {
    grid-column: span var(--grid-columns);
    width: 100%;
  }
</style>