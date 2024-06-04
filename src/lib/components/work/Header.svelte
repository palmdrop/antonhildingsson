<script lang="ts">
  import { type WorkFrontmatter } from "$lib/types/work";
	import { formatDate } from "$lib/utils/date";
	import { convertToURLFriendly } from "$lib/utils/url";

  const { 
    title, 
    date,
    tags = []
  }: WorkFrontmatter = $props();
  
  const url = `/work/${convertToURLFriendly(title)}`;
</script>

<div 
  class="work-header main-grid"
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
    grid-column: span var(--grid-columns);
    border-bottom: 1px solid var(--fg);
    padding-bottom: 0.5em;
  }

  .work-header:hover h2 span {
    background-color: var(--accent);
  }

  .subitem {
    grid-column: span calc(var(--grid-columns) / 3);
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
    white-space: nowrap;
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