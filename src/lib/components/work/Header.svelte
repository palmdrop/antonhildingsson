<script lang="ts">
	import { tagsQuery } from "$lib/state/query.svelte";
  import { type WorkFrontmatter } from "$lib/types/work";
	import { formatDate } from "$lib/utils/date";

  const { 
    title, 
    date,
    fileName,
    tags = [],
    showYear = true,
    centerTitle
  }: WorkFrontmatter & { 
    showYear: boolean,
    centerTitle?: boolean
  } = $props();
  
  const year = new Date(date).getFullYear();
  const url = fileName ? `/work/${year}/${fileName}` : '';
</script>

<div 
  class="work-header main-grid full-width"
  class:centered-title={centerTitle}
>
  <time datetime={date}>
    <a 
      href={url}
    >
    { formatDate(new Date(date), showYear) }
    </a>
  </time>
  <h2>
    <a href={url}> 
      <span class="clickable">
        { title }
      </span>
    </a>
  </h2>
  <p>
    <!--
      Set tag in URL parameter, highlight only items with tag
    -->
    { #each tags as tag (tag)}
      <a 
        class="tag neutral-clickable" 
        class:withDeliminator={tags.length > 1} 
        href={`/work?tags=${tag}`}
        class:active={tagsQuery.value.includes(tag)}
      >
        { tag }
      </a>
    { /each }
  </p>
</div> 

<style>
  .work-header {
    border-bottom: 1px solid var(--fg);
    padding-bottom: 0.5em;

    gap: 3px var(--gap);
  }

  @media (hover: hover) and (pointer: fine) {
    .work-header:hover h2 span {
      background-color: var(--accent);

      font-family: var(--font-accent);
      font-style: normal;
    }
  }

  time {
    grid-column: span 3;
    order: 1;
  }

  h2 {
    grid-column: span var(--grid-columns);
    order: 0;
  }

  .centered-title h2 {
    text-align: left;
  }

  p {
    grid-column: span 3;
    order: 1;

    text-align: right;
  }

  @media screen and (min-width: 500px) {
    .work-header {
      gap: var(--gap);
    }

    time {
      grid-column: span 2;
      order: 0;
    }

    h2 {
      grid-column: span 2;
      order: 0;
    }

    p {
      grid-column: span 2;
      order: 0;
    }

    .centered-title h2 {
      text-align: center;
    }
  }

  .withDeliminator:not(:last-of-type) {
    margin-right: 1ch;
  }

  .withDeliminator:not(:last-of-type)::after {
    content: ",";
    background-color: var(--bg);
  }

  a {
    display: inline-block;
    width: 100%;
  }

  .tag {
    width: unset;
  }

  .tag:hover {
    background-color: var(--accent);
  }
</style>