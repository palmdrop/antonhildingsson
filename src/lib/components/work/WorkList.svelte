<script lang="ts">
	import ListItem from "$lib/components/work/ListItem.svelte";
	import type { WorkItem } from "$lib/types/work";

  const {
    showPreviews,
    workList,
  }: { showPreviews?: boolean, workList: WorkItem[] } = $props();
</script>

<ol class="main-grid full-width">
  { #each workList as item, i (`${item.frontmatter.title}_${i}`) }
    <ListItem
      frontmatter={{
        ...item.frontmatter,
        preview: showPreviews
      }}
    />
  { /each }
</ol>