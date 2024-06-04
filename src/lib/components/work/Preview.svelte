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
  <div class={`${preview === true ? 'full' : preview}`}>
    { #await import(`../../../content/work/${slug}.md`) }
      <p>loading...</p>
    { :then { default: Component } }
      <Component /> 
    { :catch _ }
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

  .partial {
    max-height: var(--max-partial-preview-height);
    overflow: hidden;
    position: relative;
  }

  .partial::before {
    content: "";

    position: absolute;

    width: 100%;
    height: 100%;

    z-index: 1;

    box-shadow: inset 0px -70px 50px 0px var(--bg);
  }
</style>