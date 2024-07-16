<script lang="ts">
	import Preview from "$lib/components/work/Preview.svelte";
  import workList from "$content/work-list";
	import { getWorkUrl } from "$lib/utils/url";

  const latest = workList[0].frontmatter;
  const url = getWorkUrl(latest.date, latest.fileName)
</script>

<h2>
  <a 
    class="clickable" 
    href={url}
  >
    SENASTE: { latest.title }
  </a>
</h2>

<Preview { ...latest }/>

<style>
  h2 {
    padding-bottom: 0.5em;
    border-bottom: 1px solid var(--fg);
  }
</style>