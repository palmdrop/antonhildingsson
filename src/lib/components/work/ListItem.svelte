<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import Header from "./Header.svelte";
	import Preview from "./Preview.svelte";

  const {
    frontmatter
  }: {
    frontmatter: WorkFrontmatter
  } = $props();
</script>

<li 
  class="main-grid full-width" 
  class:preview={frontmatter.preview && frontmatter.preview !== 'none'}
>
  <Header { ...frontmatter }, showYear={true} />
  <Preview { ...frontmatter }/>
</li>

<style>
  .preview {
    border-bottom: 1px solid var(--fg);
    padding-bottom: 2em;
  }
</style>