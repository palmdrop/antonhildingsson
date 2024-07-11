<script lang="ts">
	import { createTitle } from "$lib/utils/title";
</script>

<svelte:head>
	<title>{createTitle()}</title>
	<meta 
    name="description" 
    content={`${import.meta.env.VITE_TITLE}'s writing and portfolio.`}
  />
</svelte:head>

<div></div>

<style>
</style>