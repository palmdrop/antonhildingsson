<script lang="ts">
	import Title from "$lib/components/header/Title.svelte";
	import ListItem from "$lib/components/work/ListItem.svelte";

  import workList from "$content/work-list";
	import TitleText from "$lib/components/text/TitleText.svelte";

  const list = Array(20).fill(workList).flat();
</script>

<svelte:head>
	<title>{import.meta.env.VITE_TITLE}</title>
	<meta name="description" content="Anton Hildingsson's writing and portfolio." />
</svelte:head>

<section class="main-grid full-width">
  <TitleText>
    is a lump of compacted coal. He lives in concrete walls and eats a lot of spaghetti. 
    Later this year, he will write a long text.
  </TitleText>
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