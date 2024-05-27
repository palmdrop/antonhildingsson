<script lang="ts">
	import Title from "$lib/components/header/Title.svelte";
	import Featured from "$lib/components/work/featured/Featured.svelte";
	import ListItem from "$lib/components/work/list/ListItem.svelte";
	import { type WorkListItem } from '$types/work';

  const listItems: WorkListItem[] = [
    {
      id: "1",
      href: '/work/1',
      label: 'A curly rat tail',
      date: new Date(),
      links: [],
      tags: ['poem']
    },
    {
      id: "2",
      href: '/work/2',
      label: 'Spooky derailed snob',
      date: new Date(),
      links: [],
      tags: ['poem']
    }
  ];

  listItems.push(...Array(100).fill(listItems).flat())
</script>

<svelte:head>
	<title>{import.meta.env.VITE_TITLE}</title>
	<meta name="description" content="Anton Hildingsson's writing and portfolio." />
</svelte:head>

<section class="main-grid">
  <p class="intro">
    <Title hidden /> is a lump of compacted coal. He lives in concrete walls and eats a lot of spaghetti. 
    Later this year, he will write a long text.
  </p>

  <Featured />

  <ol class="main-grid">
    { #each listItems as item, i (item.id + i)}
      <ListItem
        item={item}
      />
    { /each }
  </ol>
</section>

<style>
  section, section > * {
    grid-column: span var(--grid-columns);
  }

  .intro {
    padding-bottom: 1em;

    grid-column: span calc(2 * var(--grid-columns) / 3);
    opacity: 1;

    transition: 0.3s;
  }
</style>
