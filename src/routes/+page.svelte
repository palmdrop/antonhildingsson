<script lang="ts">
	import Title from "$lib/components/header/Title.svelte";
	import ListItem from "$lib/components/work/ListItem.svelte";

  import workList from '$content/work-list';

  /*
  workList.push(...Array(20).fill(workList).flat())
  */
  const list = Array(20).fill(workList).flat();
</script>

<svelte:head>
	<title>{import.meta.env.VITE_TITLE}</title>
	<meta name="description" content="Anton Hildingsson's writing and portfolio." />
</svelte:head>

<section class="main-grid">
  <p class="intro">
    <!--
      A small floating element is used to offset the intro paragraph to avoid overlap with navbar
    -->
    <span class="float"></span>
    <Title hidden /> 
    <span>
      is a lump of compacted coal. He lives in concrete walls and eats a lot of spaghetti. 
      Later this year, he will write a long text.
    </span>
  </p>

  <ol class="main-grid">
    { #each list as item, i (item.frontmatter.title + i)}
      <ListItem
        frontmatter={item.frontmatter}
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

  .float {
    top: 0;
    float: right;

    height: 1em;
    width: 1.5em;
  }

  @media screen and (min-width: 380px) {
    .float {
      display: none;
    }
  }
</style>
