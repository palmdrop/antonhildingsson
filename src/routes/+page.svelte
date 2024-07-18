<script lang="ts">
  import Landing from "$content/landing.md";
	import SprawlList from "$lib/components/sprawl/SprawlList.svelte";
  import SprawlHeader from "$lib/components/sprawl/Header.svelte";
	import { createTitle } from "$lib/utils/title";
</script>

<svelte:head>
	<title>{createTitle()}</title>
	<meta 
    name="description" 
    content={`${import.meta.env.VITE_TITLE}s texter och portfolio.`}
  />
</svelte:head>

<section class="main-grid full-width">
  <Landing />
</section>
<section class="main-grid full-width">
  <span style="display: inline-block;" id="fragment"></span>
  <SprawlHeader />
  <SprawlList />
</section>