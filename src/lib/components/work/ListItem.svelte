<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import Header from "./Header.svelte";
	import Preview from "./Preview.svelte";

  export let frontmatter: WorkFrontmatter;
</script>

<li class="main-grid">
  <Header { ...frontmatter } />
  <Preview { ...frontmatter }/>
</li>

<style>
  li {
    grid-column: span var(--grid-columns);
  }
</style>