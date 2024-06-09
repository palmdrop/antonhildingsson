<script lang="ts">
  import { type WorkFrontmatter } from "$lib/types/work";
	import { formatDate } from "$lib/utils/date";

  const { 
    title, 
    date,
    fileName,
    tags = []
  }: WorkFrontmatter = $props();
  
  const year = new Date(date).getFullYear();
  const url = fileName ? `/work/${year}/${fileName}` : '';
</script>

<div 
  class="work-header main-grid full-width"
>
  <time 
    datetime={date}
    class="subitem"
  >
    <a 
      href={url}
    >
    { formatDate(new Date(date)) }
    </a>
  </time>
  <h2
    class="subitem"
  >
    <a href={url}>
      <span>
        { title }
      </span>
    </a>
  </h2>
  <p
    class="subitem"
  >
    <!--
      Set tag in URL parameter, highlight only items with tag
    -->
    { #each tags as tag, i (tag)}
      <button class:withDeliminator={tags.length > 1}>
        { tag }
      </button>
    { /each }
  </p>
</div> 

<style>
  .work-header {
    border-bottom: 1px solid var(--fg);
    padding-bottom: 0.5em;

    gap: 3px var(--gap);
  }

  .work-header:hover h2 span {
    background-color: var(--accent);
  }

  .subitem {
    order: 1;
    grid-column: span calc(var(--grid-columns) / 2);
  }

  .subitem:nth-child(2) {
    grid-column: span var(--grid-columns);
    order: 0;
  }

  @media screen and (min-width: 500px) {
    .work-header {
      gap: var(--gap);
    }

    .subitem, .subitem:nth-child(2) {
      grid-column: span calc(var(--grid-columns) / 3);
      order: 0;
    }
  }

  .subitem:last-child {
    text-align: right;
  }

  .withDeliminator:not(:last-of-type)::after {
    content: ", ";
    margin-right: 1ch;
  }

  h2 {
    font-style: italic;
  }

  a {
    display: inline-block;
    width: 100%;
  }

  h2 span::before {
    content: "[ ";
  }

  h2 span::after {
    content: " ]";
  }

  h2 span::before, h2 span::after {
    font-style: normal;
  }
</style>