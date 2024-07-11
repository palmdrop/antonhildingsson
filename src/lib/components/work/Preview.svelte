<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import { getWorkUrl } from "$lib/utils/url";

  const {
    preview,
    date,
    fileName
  }: WorkFrontmatter = $props();

  const year = new Date(date).getFullYear();

  const shouldShow = preview && preview !== 'none';
  const previewClass = preview === true ? 'full' : preview;

  const componentPromise = import(`$content/work/${year}/${fileName}.md`);
</script>

{ #if shouldShow }
  <a 
    class={`${previewClass} full-width`}
    href={getWorkUrl(date, fileName)}
  >
    { #await componentPromise }
      <p>loading...</p>
    { :then { default: Component } }
      <Component /> 
    { :catch _ }
      <span></span>
    {/await}
    </a>
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