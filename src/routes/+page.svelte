<script lang="ts">
  import Landing from "$content/landing.md";
	import SprawlList from "$lib/components/sprawl/SprawlList.svelte";
  import SprawlHeader from "$lib/components/sprawl/Header.svelte";
	import HeadMeta from "$lib/components/util/HeadMeta.svelte";
</script>

<HeadMeta />

<section class="main-grid full-width">
  <Landing />
</section>
<section class="main-grid full-width">
  <span style="display: inline-block;" id="fragment"></span>
  <SprawlHeader />
  <SprawlList />
</section>