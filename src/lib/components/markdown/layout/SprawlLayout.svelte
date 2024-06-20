<script lang="ts">
	import { formatDate } from "$lib/utils/date";
	import { convertToURLFriendly } from "$lib/utils/url";

  const { 
    children,
    date,
    title,
    link
  }: { children: any, date: string, link?: string, title?: string } = $props();

  const sprawlID = `sprawl-${convertToURLFriendly(date)}` ;
</script>

<section 
  id={sprawlID}
>
<!--
  <h2 class="full-width main-grid">
    <a 
      href={link || `#${sprawlID}`} 
      class="clickable full-width"
      target={!link || link?.startsWith("/") ? "_self" : "_blank"}
    >
      <time datetime={date}>
        { formatDate(new Date(date), false) }
      </time>
      { #if title }
        <span>{ title }</span>
      { /if }
    </a>
  </h2>
-->
  <h2 class="full-width main-grid">
    <a 
      href={link || `#${sprawlID}`} 
      class="clickable full-width"
      target={!link || link?.startsWith("/") ? "_self" : "_blank"}
    >
      ...
    </a>
  </h2>
  <div class="main-grid full-width sprawl markdown">
    {@render children()}
  </div>
</section>

<style>
  section {
    padding-top: 1.75em;
  }

  h2 {
    display: inline-block;
    width: 100%;

    padding-bottom: 0.5em;

    padding-left: 1em;
  }

  span::before {
    content: "—";
    display: inline-block;

    padding: 0 0.3em;
  }
  
  .sprawl {
    padding-top: 0.25em;
    padding-right: 1em;

    /*
    grid-column: span var(--grid-columns);
    */

    /*
    display: grid;
    justify-content: center;
    */
  }

  :global(.sprawl.markdown img) {
    padding: 0;
  }

  /*
  @media screen and (min-width: 500px) {
    time {
      grid-column: span 1;
    }

    .sprawl {
      grid-column: span calc(var(--grid-columns) - 2);

      display: grid;
      justify-content: center;
    }
  }
    */
</style>