<script lang="ts">
  import Landing from "$content/landing.md";
	import workList from "$content/work-list";
  import WorkList from "$lib/components/work/WorkList.svelte";
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
  <h2 class="full-width">
    <a class="clickable" href="/work">
      TEXTER
    </a> 
  </h2>
  <WorkList 
    workList={workList}
    showPreviews={true}
  />
</section>

<style>
  h2 {
    width: 100%;
    max-width: 100%;
    padding-top: 1em;
  }
</style>