<script lang="ts">
	import { formatDate } from "$lib/utils/date";
	import { convertToURLFriendly } from "$lib/utils/url";

  const { 
    children,
    date,
    title,
    link,
    first
  }: { 
    children: any, 
    date: string, 
    link?: string, 
    title?: string,
    first?: boolean
  } = $props();

  const sprawlID = `sprawl-${convertToURLFriendly(date)}` ;

  const href = link || `#${sprawlID}`;
  const internal = !link || link?.startsWith("/");
  const label = title || "...";
</script>

<section 
  id={sprawlID}
  class:first
>
  <h2 class="full-width main-grid">
    <a 
      href={href} 
      class="clickable full-width"
      target={internal ? "" : "_blank"}
    >
      {label}
    </a>
  </h2>
  <div class="main-grid full-width sprawl markdown">
    {@render children()}
  </div>
</section>

<style>
  section {
    padding-top: calc(var(--edge-padding) + 1.5em);
  }

  .first {
    padding-top: 0.5em;
  }

  h2 {
    display: inline-block;
    width: 100%;

    padding-bottom: 0.5em;
  }

  .sprawl {
    padding-top: 0.25em;
    padding-right: 1em;
  }

  :global(.sprawl.markdown img) {
    padding: 0;
  }
</style>