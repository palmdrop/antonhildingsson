<script lang="ts">
	import type { WorkFrontmatter } from "$lib/types/work";
	import { getBlurConfig } from "$lib/utils/transitions";
	import { getWorkUrl } from "$lib/utils/url";
	import { blur, fade, slide } from "svelte/transition";

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
      <p class="loader">
        laddar...
      </p>
    { :then { default: Component } }
      <div
        in:blur={getBlurConfig()}
      >
        <Component /> 
      </div>
    { :catch _ }
      <span></span>
    {/await}
  </a>
{ /if }

<style>
  a {
    display: block;
  }

  .partial {
    max-height: var(--max-partial-preview-height);
    height: 100%;
    overflow: hidden;
    position: relative;

    z-index: 0;

    transition: height 0.5s;
  }

  .partial::before {
    content: "";

    position: absolute;

    width: 100%;
    height: var(--max-partial-preview-height);

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