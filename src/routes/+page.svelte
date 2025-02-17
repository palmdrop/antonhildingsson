<script lang="ts">
  import Landing from "$content/landing.md";
	// import SprawlList from "$lib/components/sprawl/SprawlList.svelte";
  // import SprawlHeader from "$lib/components/sprawl/Header.svelte";
	import HeadMeta from "$lib/components/util/HeadMeta.svelte";
	import Featured from "$lib/components/work/Featured.svelte";

  const { data } = $props();
  const { featured: {
    Component,
    frontmatter
  } } = data;
</script>

<HeadMeta />

<section class="main-grid full-width">
  <Landing />
  <Featured
    frontmatter={frontmatter}
  >
    <Component />
  </Featured>
</section>
<!--
<section class="main-grid full-width">
  <span style="display: inline-block;" id="fragment"></span>
  <SprawlHeader />
  <SprawlList />
</section>
-->