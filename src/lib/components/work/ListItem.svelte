<script lang="ts">
	import { tagsQuery } from "$lib/state/query.svelte";
	import type { WorkFrontmatter } from "$lib/types/work";
	import Header from "./Header.svelte";

  const {
    frontmatter,
    centerTitle = false,
    last = false,
  }: {
    frontmatter: WorkFrontmatter,
    centerTitle?: boolean
    last?: boolean
  } = $props();

  const shouldShow = $derived(!tagsQuery.value.length || tagsQuery.value.some(tag => frontmatter.tags?.includes(tag)));
</script>

{ #if shouldShow }
  <li 
    class="main-grid full-width" 
    class:preview={frontmatter.preview && frontmatter.preview !== 'none'}
  >
    <Header { ...frontmatter }, {centerTitle} border={!last} />
  </li>
{ /if }

<style>
  .preview {
    border-bottom: 1px solid var(--fg);
    padding-bottom: 2em;
  }
</style>