<script context="module" lang="ts">
  import a from "$lib/components/links/ExternalLink.svelte";

  export { 
    a 
  };
</script>

<script lang="ts">
  const { 
    children,
  }: { children: any } = $props();
</script>

<div class="markdown main-grid full-width">
  {@render children()}
</div>