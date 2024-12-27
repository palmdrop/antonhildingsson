<script lang="ts">
	import type { Snippet } from "svelte";
	import type { WorkFrontmatter } from "$lib/types/work";
	import { getWorkUrl } from "$lib/utils/url";

  const {
    preview,
    date,
    fileName,
    previewLength,
    previewStart = '0px',
    children,
  }: WorkFrontmatter & { children: Snippet }= $props();

  const shouldShow = preview && preview !== 'none';
  const previewClass = preview === true ? 'full' : preview;
</script>

{ #if shouldShow }
  <a 
    class={`${previewClass} full-width`}
    href={getWorkUrl(date, fileName)}
    style={`
      ${typeof previewLength === 'string' ? `--preview-length: ${previewLength}` : ''}; 
      --preview-start: ${previewStart}`
    }
  >
    <div class="offset">
      { @render children() }
    </div>
  </a>
{ /if }

<style>
  a {
    display: block;
    position: relative;
  }

  .partial {
    height: var(--preview-length, var(--max-partial-preview-height));
    overflow: hidden;
    position: relative;

    z-index: 0;

    transition: height 0.5s;
  }

  .partial::before {
    content: "";

    position: absolute;

    width: 100%;
    height: var(--preview-length, var(--max-partial-preview-height));

    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 50%,
      var(--bg) 100%
    );

    z-index: 1;
    pointer-events: none;
  }

  .offset {
    top: calc(-1 * var(--preview-start));
    position: relative;
  }
</style>