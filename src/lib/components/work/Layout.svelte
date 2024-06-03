<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import Header from "./Header.svelte";

  const { 
    children,
    alone = false,
    ...frontmatter
  }: WorkFrontmatter & { children: any, alone?: boolean } = $props();

  const renderingMode: WorkFrontmatter['preview'] = alone 
    ? 'full' 
    : frontmatter.preview;
</script>

{ #if renderingMode && renderingMode !== 'none'}
  <article>
    {#if alone }
      <Header { ...frontmatter } />
    { /if }
    {@render children()}
  </article>
{ /if }

<style>
  article {
    grid-column: span var(--grid-columns);
    width: 100%;
  }
</style>