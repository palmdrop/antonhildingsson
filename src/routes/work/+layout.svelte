<script lang="ts">
  let { children } = $props();
</script>

<div class="main-grid full-width">
  {@render children()}
</div>

<style>
  div {
    padding-top: 2em;
  }
</style>