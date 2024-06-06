<script lang="ts">
  const { 
    children,
  }: { children: any } = $props();
</script>

<article class="main-grid full-width">
  {@render children()}
</article>

<style>
  :global(article > *) {
    grid-column: span var(--grid-columns); 
  }
</style>