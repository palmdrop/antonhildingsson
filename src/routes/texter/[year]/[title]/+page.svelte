<script lang="ts">
  const { data } = $props();
  const { Component } = data;
</script>

<div class="main-grid full-width">
  <Component alone />
</div>

<style>
  div {
    padding-top: 2em;
  }
</style>