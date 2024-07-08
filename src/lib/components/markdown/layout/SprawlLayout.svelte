<script lang="ts">
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
  const linkLabel = "🔗";
</script>

<a 
  id={sprawlID}
  class:first
  href={href}
  target={internal ? "" : "_blank"}
>
  <div class="sprawl markdown">
    {@render children()}
    { #if !internal }
      <p>
        { linkLabel }
      </p>
    { /if }
  </div>
</a>

<style>
  a {
    display: block;
    padding-top: calc(var(--edge-padding) + 1.75em);
    height: 100%;
  }

  .sprawl {
    border: 1px solid var(--bg);
  }

  a:hover .sprawl {
    border-bottom: 1px solid var(--fg);

    font-family: var(--font-accent);
  }

  :global(.sprawl.markdown img) {
    padding: 0;
  }

  :global(.sprawl.markdown p) {
    padding-bottom: 0.5em;
  }
</style>