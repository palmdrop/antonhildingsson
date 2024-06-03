<script lang="ts">
  import { type WorkFrontmatter } from "$lib/types/work";
	import { formatDate } from "$lib/utils/date";
	import { convertToURLFriendly } from "$lib/utils/url";

  const { 
    title, 
    date,
    // links,
    tags = []
  }: WorkFrontmatter = $props();
  
  const url = `work/${convertToURLFriendly(title)}`;
</script>

<a 
  href={url}
  class="main-grid"
>
  <time 
    datetime={date}
    class="subitem"
  >
    { formatDate(new Date(date)) }
  </time>
  <h2
    class="subitem"
  >
    { title }
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
</a> 

<style>
  a {
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