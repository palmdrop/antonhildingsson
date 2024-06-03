<script lang="ts">
	import type { WorkListItem } from "$lib/types/work";
	import Header from "./Header.svelte";
	import Preview from "./Preview.svelte";

  export let item: WorkListItem;
</script>

<li class="main-grid">
  <Header { ...item } />
  <Preview { ...item }/>
</li>

<style>
  li {
    grid-column: span var(--grid-columns);
  }
</style>