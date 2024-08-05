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
  <article 
    class="sprawl markdown" 
    {lang}
  >
    {@render children()}
    { #if !internal }
      <p>
        { linkLabel }
      </p>
    { /if }
  </article>
</a>

<style>
  a {
    display: block;
    height: 100%;
  }

  .sprawl {
    border: var(--border-inverted);
    padding-top: var(--item-top-padding);
  }

  a:active .sprawl {
    border-bottom: var(--border);
    font-family: var(--font-accent);
  }

  @media (hover: hover) and (pointer: fine) {
    a:hover .sprawl {
      border-bottom: var(--border);
      font-family: var(--font-accent);
    }
  }

  :global(.sprawl.markdown img) {
    padding: 0;
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 1000px;
  }

  :global(.sprawl.markdown p) {
    padding-bottom: 0.5em;
  }
</style>