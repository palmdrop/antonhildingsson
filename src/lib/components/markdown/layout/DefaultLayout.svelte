<script context="module" lang="ts">
	import type { Snippet } from "svelte";
  import a from "$lib/components/links/ExternalLink.svelte";

  export { 
    a 
  };
</script>

<script lang="ts">
  const { 
    children,
  }: { children: Snippet } = $props();
</script>

<div class="markdown main-grid full-width">
  {@render children()}
</div>