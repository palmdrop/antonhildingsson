<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import Header from "./Header.svelte";

  const { 
    children,
    date,
    title,
    // tags,
    // links
  }: WorkFrontmatter & { children: any } = $props();
</script>

<article class="main-grid">
  <Header {date} {title} />
  <section>
    {@render children()}
  </section>
</article>

<style>
  article {
    grid-column: span var(--grid-columns);
    width: 100%;
  }

  section {
    grid-column: span var(--grid-columns);
    padding-left: 1em;
  }
</style>