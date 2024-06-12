<script lang="ts">
  import Landing from "$content/landing.md";
	import workList from "$content/work-list";
  import WorkList from "$lib/components/work/WorkList.svelte";
</script>

<svelte:head>
	<title>{import.meta.env.VITE_TITLE}</title>
	<meta name="description" content={`${import.meta.env.VITE_TITLE}'s writing and portfolio.`} />
</svelte:head>

<section class="main-grid full-width">
  <Landing />
</section>
<section class="main-grid full-width">
  <p class="full-width">
    <a href="/work">
      TEXT OCH ANNAT
    </a>
  </p>
  <WorkList 
    workList={workList}
    showPreviews={true}
  />
</section>

<style>
  p {
    width: 100%;
    max-width: 100%;
    padding-top: 1em;
  }
</style>