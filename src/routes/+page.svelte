<script lang="ts">
  import Landing from "$content/landing.md";
	// import workList from "$content/work-list";
	import SprawlList from "$lib/components/sprawl/SprawlList.svelte";
  // import WorkList from "$lib/components/work/WorkList.svelte";
	import { createTitle } from "$lib/utils/title";
</script>

<svelte:head>
	<title>{createTitle()}</title>
	<meta name="description" content={`${import.meta.env.VITE_TITLE}'s writing and portfolio.`} />
</svelte:head>

<section class="main-grid full-width">
  <Landing />
</section>
<section class="main-grid full-width">
  <SprawlList />
  <!--
  <WorkList 
    workList={workList}
    showPreviews={true}
  />
  -->
</section>

<style>
</style>