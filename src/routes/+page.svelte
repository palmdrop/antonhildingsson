<script lang="ts">
	import ListItem from "$lib/components/work/ListItem.svelte";

  import Landing from "$content/landing.md";
  import workList from "$content/work-list";
</script>

<svelte:head>
	<title>{import.meta.env.VITE_TITLE}</title>
	<meta name="description" content="Anton Hildingsson's writing and portfolio." />
</svelte:head>

<section class="main-grid full-width">
  <Landing />
</section>
<section class="main-grid full-width">
  <p class="full-width">
    TEXT OCH ANNAT
  </p>
  <ol class="main-grid full-width">
    { #each workList as item, i (item.frontmatter.title + i)}
      <ListItem
        frontmatter={item.frontmatter}
      />
    { /each }
  </ol>
</section>

<style>
  p {
    display: grid;
    width: 100%;
    max-width: 100%;
    padding-top: 1em;
  }
</style>