<script lang="ts">
  import { type WorkFrontmatter } from "$lib/types/work";
	import { formatDate } from "$lib/utils/date";

  const { 
    title, 
    date,
    fileName,
    tags = [],
    showYear = true
  }: WorkFrontmatter & { 
    showYear: boolean
  } = $props();
  
  const year = new Date(date).getFullYear();
  const url = fileName ? `/work/${year}/${fileName}` : '';
</script>

<div 
  class="work-header main-grid full-width"
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
      <span>
        { title }
      </span>
    </a>
  </h2>
  <p>
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

  time {
    grid-column: span 2;
    order: 1;
  }

  h2 {
    grid-column: span var(--grid-columns);
    order: 0;
  }

  p {
    grid-column: span 4;
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
    white-space: nowrap;
  }

  h2 span::after {
    content: " ]";
    white-space: nowrap;
  }

  h2 span::before, h2 span::after {
    font-style: normal;
  }
</style>