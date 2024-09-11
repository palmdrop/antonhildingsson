<script lang="ts">
	import type { Snippet } from "svelte";
	import type { WorkFrontmatter } from "$lib/types/work";
	import { getWorkUrl } from "$lib/utils/url";

  const {
    preview,
    date,
    fileName,
    children,
  }: WorkFrontmatter & { children: Snippet }= $props();

  const shouldShow = preview && preview !== 'none';
  const previewClass = preview === true ? 'full' : preview;
</script>

{ #if shouldShow }
  <a 
    class={`${previewClass} full-width`}
    href={getWorkUrl(date, fileName)}
  >
    { @render children() }
  </a>
{ /if }

<style>
  a {
    display: block;
  }

  .partial {
    height: var(--max-partial-preview-height);
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