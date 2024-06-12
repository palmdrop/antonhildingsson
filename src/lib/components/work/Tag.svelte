<script lang="ts">
	import { tagsQuery } from "$lib/state/query.svelte";
	import type { Tag } from "$lib/types/work";

  const { 
    tag 
  }: { 
    tag: Tag 
  } = $props();

  const onClick = () => {
    let tags = tagsQuery.value;

    const isAdded = tagsQuery.value.includes(tag);

    if(isAdded) {
      tagsQuery.value = tags.filter(existingTag => existingTag !== tag);
    } else {
      tagsQuery.value = [...tags, tag];
    }
  }
  
  let active = $derived(tagsQuery.value?.includes(tag));
</script>

<button 
  onclick={onClick} 
  class:active
  class="clickable"
>
  { tag }
</button>

<style>
</style>