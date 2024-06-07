<script lang="ts">
	import ListItem from "$lib/components/work/ListItem.svelte";

  import Landing from "$content/landing.md";
  import workList from "$content/work-list";

  const list = Array(20).fill(workList).flat();
</script>

<svelte:head>
	<title>{import.meta.env.VITE_TITLE}</title>
	<meta name="description" content="Anton Hildingsson's writing and portfolio." />
</svelte:head>

<section class="main-grid full-width">
  <Landing />
</section>
<section class="main-grid full-width">
  <ol class="main-grid full-width">
    { #each list as item, i (item.frontmatter.title + i)}
      <ListItem
        frontmatter={item.frontmatter}
      />
    { /each }
  </ol>
</section>