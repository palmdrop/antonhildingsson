<script lang="ts">
	import workList from "$content/work-list";
  import WorkList from "$lib/components/work/WorkList.svelte";
  import { tags } from "$content/tags";
	import Tag from "$lib/components/work/Tag.svelte";
	import { onMount } from "svelte";
	import { tagsQuery } from "$lib/state/query.svelte";

  import Work from "$content/work.md";
	import HeadMeta from "$lib/components/util/HeadMeta.svelte";

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  })

  const clearTags = () => {
    tagsQuery.value = [];
  }
</script>

<HeadMeta 
  title="Texter"
  description={`En samling av ${import.meta.env.VITE_TITLE}s prosa och poesi.`}
  route="texter"
/>

<section class="main-grid full-width">
  <Work />
  <h2 class="full-width">
    KATEGORIER
  </h2>
  <ul class="tags full-width">
    {#each tags as tag}
      <li>
        <Tag tag={tag} />
      </li>
    {/each}
    <li>
      <button class="clickable" onclick={clearTags}>
        X
      </button>
    </li>
  </ul>
</section>
<section class="work main-grid full-width" class:mounted={mounted}>
  <h2 class="full-width work-title">
    TEXTER
  </h2>
  <WorkList 
    workList={workList}
    showPreviews={false}
  />
</section>

<style>
  ul {
    display: flex;
    gap: var(--gap);
  }

  .work {
    display: none;
  }

  .mounted {
    display: block;
  }

  h2 {
    padding-top: 1em;
    padding-bottom: 0.0em;
  }

  .work-title {
    padding-bottom: 0.5em;
  }

  .tags {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
</style>