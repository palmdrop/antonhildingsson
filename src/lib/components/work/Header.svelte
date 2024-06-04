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
  <a 
    href={url}
    class="subitem"
  >
    <time 
      datetime={date}
    >
      { formatDate(new Date(date)) }
    </time>
  </a>
  <a
    href={url}
    class="subitem"
  >
    <h2>
      { title }
    </h2>
  </a>
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
</style>