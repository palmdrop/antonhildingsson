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
<article class="full-width">
  {@render children()}
</article>

<style>
  article {
    width: 100%;
    padding: 1em 0em;
  }

  :global(article img) {
    width: 100%;
    max-width: 1000px;

    object-fit: cover;

    padding: 1em 0em;
  }

  @media screen and (min-width: 500px) {
    article {
      padding: 1em;
    }

    :global(article img) {
      padding: 1em;
    }
  }
</style>