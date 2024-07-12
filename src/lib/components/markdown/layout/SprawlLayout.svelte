<script lang="ts">
	import { convertToURLFriendly } from "$lib/utils/url";

  const { 
    children,
    date,
    link,
    lang,
    first
  }: { 
    children: any, 
    date: string, 
    link?: string, 
    lang?: string,
    first?: boolean
  } = $props();

  const sprawlID = `fragment-${convertToURLFriendly(date)}` ;

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
  <div 
    class="sprawl markdown" 
    {lang}
  >
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
    height: 100%;
  }

  .sprawl {
    border: 1px solid var(--bg);
    padding-top: var(--item-top-padding);
  }

  a:hover .sprawl {
    border-bottom: 1px solid var(--fg);

    font-family: var(--font-accent);
  }

  :global(.sprawl.markdown img) {
    padding: 0;
    width: auto;
    max-width: 100%;
    max-height: 1000px;
  }

  :global(.sprawl.markdown p) {
    padding-bottom: 0.5em;
  }
</style>