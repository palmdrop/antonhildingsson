<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";

  const {
    preview,
    date,
    fileName
  }: WorkFrontmatter = $props();

  const year = new Date(date).getFullYear();

  const shouldShow = preview && preview !== 'none';
  const previewClass = preview === true ? 'full' : preview;
</script>

{ #if shouldShow }
  <div class={`${previewClass} full-width`}>
    { #await import(`$content/work/${year}/${fileName}.md`) }
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
  .partial {
    max-height: var(--max-partial-preview-height);
    overflow: hidden;
    position: relative;

    z-index: 0;
  }

  .partial::before {
    content: "";

    position: absolute;

    width: 100%;
    height: 100%;
    max-height: var(--max-partial-preview-height);

    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 50%,
      var(--bg) 100%
    );

    z-index: 1;
    pointer-events: none;
  }
</style>