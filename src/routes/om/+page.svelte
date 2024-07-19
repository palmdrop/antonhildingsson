<script lang="ts">
  import About from "$content/about.md";
	import { createTitle } from "$lib/utils/work";
</script>

<svelte:head>
	<title>{createTitle("Om")}</title>
	<meta 
    name="description" 
    content={`Information om ${import.meta.env.VITE_TITLE}, hans skrivande, och CV.`}
  />
</svelte:head>

<About />