<script lang="ts">
	import Preview from "$lib/components/work/Preview.svelte";
	import Header from "$lib/components/work/Header.svelte";
  import workList from "$content/work-list";

  const latest = workList[0].frontmatter;
</script>


<h2>
  SENASTE TEXTEN
</h2>

<Header { ...latest } centerTitle={true}/>
<Preview { ...latest }/>

<style>
</style>