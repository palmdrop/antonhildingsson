<script lang="ts">
	import ListItem from "$lib/components/work/ListItem.svelte";
  import Landing from "$content/landing.md";
  import workList from "$content/work-list";

  type WorkItem = typeof workList[number];
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
    TEXT OCH ANNAT
  </p>
  <ol class="main-grid full-width">
    { #each workList as item, i (`${item.frontmatter.title}_${i}`) }
      <ListItem
        frontmatter={item.frontmatter}
      />
    { /each }
  </ol>
</section>

<style>
  p {
    width: 100%;
    max-width: 100%;
    padding-top: 1em;
  }
</style>