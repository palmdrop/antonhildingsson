<script lang="ts">
	import type { WorkListItem } from "$types/work";

  export let item: WorkListItem;

  const formatDate = (fullDate: Date) => {
    const date = (fullDate.getDate() + "").padStart(2, "0");
    const month = (fullDate.getMonth() + "").padStart(2, "0");
    const year = (fullDate.getFullYear() + "").slice(2);
    return `${date}.${month}.${year}`;
  }
</script>

<li class="main-grid">
  <a 
    href={item.href}
    class="main-grid"
  >
    <time 
      datetime={item.date.toISOString()}
      class="subitem"
    >
      {formatDate(item.date)}
    </time>
    <h2
      class="subitem"
    >
      { item.label }
    </h2>
    <p
      class="subitem"
    >
      <!--
        Set tag in URL parameter, highlight only items with tag
      -->
      { item.tags?.[0] }
    </p>
  </a> 
</li>

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