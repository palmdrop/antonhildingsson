<script lang="ts">
  import { type WorkFrontmatter } from "$lib/types/work";
	import { formatDate } from "$lib/utils/date";
	import { convertToURLFriendly } from "$lib/utils/url";

  const { title, date }: WorkFrontmatter = $props();
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
    {formatDate(new Date(date))}
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
    todo
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
</style>