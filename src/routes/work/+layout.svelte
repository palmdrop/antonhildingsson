<script lang="ts">
  let { children } = $props();
</script>

<div class="app main-grid">
  {@render children()}
</div>

<style>
  div {
    padding-top: 2em;
  }
</style>