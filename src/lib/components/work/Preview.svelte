<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import { convertToURLFriendly } from "$lib/utils/url";

  const {
    ...workFrontmatter
  }: WorkFrontmatter = $props();

  const slug = convertToURLFriendly(workFrontmatter.title);
</script>

<div>
  { #await import(`../../../content/work/${slug}.md`) }
    <p>loading...</p>
  { :then { default: Component } }
    <Component /> 
  { :catch error }
    <p>
      Nothing to see here...
    </p>
  {/await}
</div>

<style>
  div {
    padding: 0em 1em;
    grid-column: span var(--grid-columns);
  }
</style>