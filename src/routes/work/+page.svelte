<script lang="ts">
	import workList from "$content/work-list";
	import TitleText from "$lib/components/text/TitleText.svelte";
  import WorkList from "$lib/components/work/WorkList.svelte";
  import { tags } from "$content/tags";
	import Tag from "$lib/components/work/Tag.svelte";
	import { onMount } from "svelte";

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  })
</script>

<section class="main-grid full-width">
  <TitleText>
    makes work. He works. Work makes him human. Humans make him work. Does he like to work? Sometimes, sometimes not. He likes it when his work is work.
  </TitleText>
  <div>
    <span>KATEGORIER:</span>
    <ul class="tags">
      {#each tags as tag}
        <li>
          <Tag tag={tag} />
        </li>
      {/each}
    </ul>
  </div>
</section>
<section class="work main-grid full-width" class:mounted={mounted}>
  <WorkList 
    workList={workList}
    showPreviews={false}
  />
</section>

<style>
  section {
    padding-bottom: 1em;
  }

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
</style>