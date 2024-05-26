<script lang="ts">
  let { children } = $props();
</script>

<div class="app main-grid">
  <article>
    {@render children()}
  </article>
</div>

<style>
  article {
    padding-top: 2em;
  }
</style>