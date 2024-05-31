<script lang="ts">
  import { type WorkFrontmatter } from "$lib/types/work";
	import { formatDate } from "$lib/utils/date";

  const { title, date }: WorkFrontmatter = $props();
</script>

<a 
  href={`/work/todo`}
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