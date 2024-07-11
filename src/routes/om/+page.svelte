<script lang="ts">
  import About from "$content/about.md";
	import { createTitle } from "$lib/utils/title";
</script>

<svelte:head>
	<title>{createTitle("Om")}</title>
	<meta 
    name="description" 
    content={`Additional information about ${import.meta.env.VITE_TITLE}.`}
  />
</svelte:head>

<About />