<script lang="ts">
	import type { WorkListItem } from "$lib/types/work";
	import Header from "./Header.svelte";

  export let item: WorkListItem;
</script>

<li class="main-grid">
  <Header {...item} />
</li>

<style>
  li {
    grid-column: span var(--grid-columns);
  }
</style>