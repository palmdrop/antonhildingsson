<script lang="ts">
	import type { Snippet } from "svelte";
	import Preview from "$lib/components/work/Preview.svelte";
	import { getWorkUrl } from "$lib/utils/url";
	import type { WorkFrontmatter } from "$lib/types/work";

  const { frontmatter, children }: { 
    frontmatter: WorkFrontmatter,
    children: Snippet
  } = $props();

  const url = getWorkUrl(frontmatter.date, frontmatter.fileName)
</script>

<h2 class="full-width">
  <a 
    class="clickable" 
    href={url}
  >
    SENASTE: { frontmatter.title }
  </a>
</h2>

<Preview 
  {...frontmatter}
>
  { @render children() }
</Preview>

<style>
  h2 {
    padding-bottom: 0.5em;
    border-bottom: var(--border);

    text-transform: none;

    padding-top: 1em;
  }
</style>