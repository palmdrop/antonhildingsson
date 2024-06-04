<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import { convertToURLFriendly } from "$lib/utils/url";

  const {
    title,
    preview
  }: WorkFrontmatter = $props();

  const slug = convertToURLFriendly(title);
</script>

{ #if preview && preview !== 'none'}
  <div>
    { #await import(`../../../content/work/${slug}.md`) }
      <p>loading...</p>
    { :then { default: Component } }
      <Component /> 
    { :catch error }
      <p>
        Error fetching work... Retry?
      </p>
    {/await}
  </div>
{ /if }

<style>
  div {
    padding: 0em 1em;
    grid-column: span var(--grid-columns);
  }
</style>