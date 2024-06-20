<script lang="ts">
	import Preview from "$lib/components/work/Preview.svelte";
  import workList from "$content/work-list";

  const latest = workList[0].frontmatter;

  const year = new Date(latest.date).getFullYear();
  const url = latest.fileName ? `/work/${year}/${latest.fileName}` : '';
</script>


<h2>
  <a class="clickable" href={url}>
    SENASTE - {latest.title}
  </a>
</h2>

<Preview { ...latest }/>
